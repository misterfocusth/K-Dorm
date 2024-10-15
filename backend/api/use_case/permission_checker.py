from backend.api.repository.maintenance_repository import MaintenanceRepository
from backend.api.repository.maintenance_staff_repository import (
    MaintenanceStaffRepository,
)
from backend.domain.models import MaintenanceStaff
from exception.application_logic.client.not_found import NotFoundException
from exception.permission.unauthorized_action import UnauthorizedActionException
from interfaces.context import Context
from interfaces.request_with_context import RequestWithContext
from api.repository.staff_repository import StaffRepository
from api.repository.student_repository import StudentRepository


def student_themselves_or_is_staff_using_student_id(
    ctx: Context, studentId: str
) -> bool:
    user = ctx.user
    if user == None or user.uid == None:
        raise UnauthorizedActionException("Not logged in")

    isStaff = bool(StaffRepository.get_staff_by_account_id(user.uid))
    if isStaff:
        return True

    student = StudentRepository.get_by_account_id(user.uid)
    if not student:
        raise NotFoundException("Student is not found")
    return student.studentId == studentId


def student_themselves_or_is_staff_using_student_pk(
    ctx: Context, studentPk: str
) -> bool:
    user = ctx.user
    if user == None or user.uid == None:
        raise UnauthorizedActionException("Not logged in")

    isStaff = bool(StaffRepository.get_staff_by_account_id(user.uid))
    if isStaff:
        return True

    student = StudentRepository.get_by_account_id(user.uid)
    if not student:
        raise NotFoundException("Student is not found")
    return student.pk == studentPk


def student_themselves_using_id(ctx: Context, student_id: str):
    user = ctx.user
    if user == None or user.uid == None:
        raise UnauthorizedActionException("Not logged in")

    student = StudentRepository.get_by_account_id(user.uid)
    if not student:
        raise NotFoundException("Student is not found")
    return student.studentId == student_id


def student_themselves_using_pk(ctx: Context, student_pk: str):
    user = ctx.user
    if user == None or user.uid == None:
        raise UnauthorizedActionException("Not logged in")

    student = StudentRepository.get_by_account_id(user.uid)
    if not student:
        raise NotFoundException("Student is not found")
    return student.pk == student_pk


def student_themselves_or_is_maintenance_staff_using_student_id(
    ctx: Context, student_id: str
):
    user = ctx.user
    if user == None or user.uid == None:
        raise UnauthorizedActionException("Not logged in")

    isStaff = bool(MaintenanceStaffRepository.get_by_account_id(user.uid))
    if isStaff:
        return True

    student = StudentRepository.get_by_account_id(user.uid)
    if not student:
        raise NotFoundException("Student is not found")
    return student.studentId == student_id


def student_themselve_or_is_maintenance_staff_using_student_pk(
    ctx: Context, student_pk: str
):
    user = ctx.user
    if user == None or user.uid == None:
        raise UnauthorizedActionException("Not logged in")

    isStaff = bool(MaintenanceStaffRepository.get_by_account_id(user.uid))
    if isStaff:
        return True

    student = StudentRepository.get_by_account_id(user.uid)
    if not student:
        raise NotFoundException("Student is not found")
    return student.pk == student_pk
