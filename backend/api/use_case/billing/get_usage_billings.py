from typing import Literal, Optional
from backend.api.repository import rent_billing_repository
from backend.api.use_case.billing import permission_checker
from backend.exception.application_logic.server.Unexpected import UnexpectedException
from backend.layer.use_case import usecase
from backend.repositories.student import StudentRepository
from interfaces.context import Context


@usecase(permission_checker.get_billing)
def get_usage_billings_by_student_id(
    ctx: Context,
    studentId: str,
    paid_status: Literal["PAID", "UNPAID", "ALL"] = "ALL",
):

    student = StudentRepository.get_student_by_studentId(studentId)
    if student is None:
        raise UnexpectedException("Student not found")

    return rent_billing_repository.get_list(
        student_pk=student.pk,
        paid_status=(
            True
            if paid_status == "PAID"
            else False if paid_status == "UNPAID" else None
        ),
    )
