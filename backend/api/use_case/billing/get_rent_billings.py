from typing import List, Literal, Optional

from backend.api.repository import rent_billing_repository
from backend.api.use_case.billing import permission_checker
from backend.exception.application_logic.client.not_found import NotFoundException
from backend.interfaces.context import Context
from backend.layer.use_case import usecase

from backend.repositories.student import StudentRepository


@usecase(permissionChecker=permission_checker.get_billing)
def get_rent_billings(
    ctx: Context,
    studentId: Optional[str] = None,
    paid_status: Literal["PAID", "UNPAID", "ALL"] = "ALL",
):

    if studentId is not None:

        student = StudentRepository.get_student_by_studentId(studentId)
        if student is None:
            raise NotFoundException("Student not found")

        return rent_billing_repository.get_list(
            student_pk=student.pk,
            paid_status=(
                True
                if paid_status == "PAID"
                else False if paid_status == "UNPAID" else None
            ),
        )

    return rent_billing_repository.get_list(
        paid_status=(
            True
            if paid_status == "PAID"
            else False if paid_status == "UNPAID" else None
        )
    )
