from exception.application_logic.client.not_found import NotFoundException
from exception.permission.unauthorized_action import UnauthorizedAction
from interfaces.context import Context
from interfaces.request_with_context import RequestWithContext
from repositories.staff import StaffRepository
from repositories.student import StudentRepository


def get_billing(ctx: Context, studentId: str) -> bool:
    user = ctx.user
    if user == None or user.uid == None:
        raise UnauthorizedAction("Not logged in")

    isStaff = bool(StaffRepository.get_staff_by_account_id(user.uid))
    if isStaff:
        return True

    student = StudentRepository.get_student_by_account_id(user.uid)
    if not student:
        raise NotFoundException("Student is not found")
    return student.studentId == studentId
