from typing import Literal, Optional
from api.repository import rent_billing_repository
from backend.api.use_case.student import permission_checker
from exception.application_logic.client.not_found import NotFoundException
from layer.use_case import usecase
from api.repository.student_repository import StudentRepository
from interfaces.context import Context


@usecase(permission_checker=permission_checker.themselves_or_is_staff_using_student_id)
def get_usage_billings_by_student_id(
    ctx: Context,
    studentId: str,
    paid_status: Literal["PAID", "UNPAID", "ALL"] = "ALL",
):

    student = StudentRepository.get_by_student_id(studentId)
    if student is None:
        raise NotFoundException("Student not found")

    return rent_billing_repository.get_list(
        studentPk=student.pk,
        paid_status=(
            True
            if paid_status == "PAID"
            else False if paid_status == "UNPAID" else None
        ),
    )
