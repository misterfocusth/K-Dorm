from re import M
from api.use_case.student.edit_student import edit_student
from api.use_case.student.onboard import onboard
from api.use_case.student.get_student_from_ctx import get_student_from_ctx
from api.use_case.student.create_students import create_students
from api.repository.student_repository import StudentRepository
from api.use_case import permission_checker
from api.repository.account import AccountRepository
from domain.models import Account
from interfaces.context import Context
from interfaces.request_with_context import RequestWithContext
from layer.use_case import usecase


@usecase(only_authenticated=True)
def get_all(ctx: Context):
    students = StudentRepository.get_all()
    return students


@usecase(only_authenticated=True)
def get_students_as_account(ctx: Context):
    student = AccountRepository.get_all_student_accounts()
    return student


@usecase(
    only_authenticated=True,
    permission_checker=permission_checker.student_themselves_or_is_staff_using_student_id,
)
def get_by_id(ctx: Context, pk: str):
    student = StudentRepository.get_by_account_id(pk)
    return student


@usecase(
    only_authenticated=True,
    permission_checker=permission_checker.student_themselves_or_is_staff_using_student_id,
)
def delete_by_id(ctx: Context, pk: str):
    student = StudentRepository.delete_by_pk(pk)
    account = AccountRepository.delete_account_by_id(student.account.pk)
    return account
