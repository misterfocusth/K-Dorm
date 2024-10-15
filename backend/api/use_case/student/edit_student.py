from typing import NotRequired, Optional, TypedDict

from django.forms import model_to_dict


from backend.api.use_case import permission_checker

from domain.models import Account, Student
from interfaces.context import Context
from layer.use_case import usecase
from api.repository import student_repository
from api.repository import account_repository
from api.repository.account_repository import AccountRepository
from api.repository.student_repository import StudentRepository


# Django
from django.db import transaction


class EditStudentPayload(
    student_repository.EditStudentPayload, account_repository.EditAccountPayload
):
    pass


class _nested_student_return_type(TypedDict):
    studentId: str
    isOnBoarded: bool


class ReturnType(TypedDict):
    email: str
    first_name: str
    last_name: str
    uid: str
    isDisabled: bool

    student: _nested_student_return_type


"""Edit student infomration, must be staff or student themselves"""


@transaction.atomic
@usecase(
    permission_checker=permission_checker.student_themselves_or_is_staff_using_student_id
)
def edit_student(
    ctx: Context, studentPk: str, payload: EditStudentPayload
) -> ReturnType:
    student = StudentRepository.edit_by_pk(studentPk, payload)
    account = AccountRepository.edit_by_id(student.account.id, payload)

    student_dict = model_to_dict(student)
    account_dict = model_to_dict(account)

    return {
        "email": account_dict["email"],
        "first_name": account_dict["first_name"],
        "last_name": account_dict["last_name"],
        "uid": account_dict["uid"],
        "isDisabled": account_dict["isDisabled"],
        "student": {
            "studentId": student_dict["studentId"],
            "isOnBoarded": student_dict["isOnBoarded"],
        },
    }
