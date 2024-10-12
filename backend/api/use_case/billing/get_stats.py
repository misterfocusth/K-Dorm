from datetime import datetime
from functools import reduce
from typing import List, TypedDict, cast

from backend.api.repository import rent_billing_repository
from backend.api.repository import usage_billing_repository
from backend.api.use_case.billing import permission_checker
from backend.domain.models import BaseBillingModel, RentBilling, Account, Student
from backend.exception.application_logic.client.base import InvalidRequestException
from backend.exception.permission.unauthorized_action import UnauthorizedAction
from backend.interfaces.request_with_context import RequestWithContext
from rest_framework import permissions
from backend.interfaces.context import Context
from backend.layer.use_case import usecase
from backend.repositories.staff import StaffRepository
from backend.repositories.student import StudentRepository


class Stats(TypedDict):
    total_unpaid: float
    usage_unpaid: float
    rent_unpaid: float
    nearest_deadline: datetime | None
    unpaid_bill_count: int


"""
    For student to get overall stats of their billing
"""


@usecase(permission_checker.get_billing)
def get_stats(ctx: Context, studentId: str) -> Stats:

    student = StudentRepository.get_student_by_studentId(studentId)
    if student is None:
        raise InvalidRequestException("Student target not found")

    rent_billings = rent_billing_repository.get_list(
        student_pk=student.pk, paid_status=False
    )
    usage_billings = usage_billing_repository.get_list_by_student_pk(
        student_pk=student.pk, paid_status=False
    )

    total_rent_cost = 0
    total_usage_cost = 0
    for bill in rent_billings:
        total_rent_cost = bill.extraCost + bill.rentCost + bill.fineCost
        total_rent_cost += total_rent_cost
    for bill in usage_billings:
        total_usage_cost += (
            bill.waterCost + bill.electricityCost + bill.fineCost + bill.extraCost
        )

    nearest_deadline: datetime | None = None
    for bill in rent_billings + usage_billings:
        bill = cast(BaseBillingModel, bill)
        if nearest_deadline is None or (
            bill.deadline is not None and bill.deadline < nearest_deadline
        ):
            nearest_deadline = bill.deadline

    unpaid_bill_count = len(rent_billings) + len(usage_billings)

    return {
        "total_unpaid": total_usage_cost + total_rent_cost,
        "usage_unpaid": total_usage_cost,
        "rent_unpaid": total_rent_cost,
        "nearest_deadline": nearest_deadline,
        "unpaid_bill_count": unpaid_bill_count,
    }
