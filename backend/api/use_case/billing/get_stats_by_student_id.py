from datetime import datetime
from functools import reduce
from typing import List, TypedDict, cast

from api.repository import rent_billing_repository
from api.repository import usage_billing_repository
from api.use_case.billing import permission_checker
from domain.models import BaseBillingModel, RentBilling, Account, Student
from exception.application_logic.client.base import InvalidRequestException
from exception.permission.unauthorized_action import UnauthorizedAction
from interfaces.request_with_context import RequestWithContext
from rest_framework import permissions
from interfaces.context import Context
from layer.use_case import usecase
from api.repository.staff import StaffRepository
from api.repository.student import StudentRepository


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
def get_stats_by_student_id(ctx: Context, studentId: str) -> Stats:

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
