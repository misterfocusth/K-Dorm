# Django REST Framework
from typing import Literal, TypedDict
from rest_framework.decorators import api_view

# Django
from django.db import transaction

# Firebase
from firebase_admin import auth

# Utils
from layer.use_case import usecase
from repositories.staff import StaffRepository
from repositories.student import StudentRepository
import utils.token as token_utils

# Repository
from repositories.account import AccountRepository
from interfaces.context import Context


class UserData(TypedDict):
    email: str
    first_name: str
    last_name: str


@transaction.atomic
@usecase()
def create_account(
    ctx: Context,
    auth_user_data: UserData,
    role: Literal["STUDENT", "STAFF", "SECURITY_STAFF", "MAINTERNANCE_STAFF"],
):

    account = AccountRepository.create_new_account(
        email=auth_user_data["email"],
        first_name=auth_user_data["first_name"],
        last_name=auth_user_data["last_name"],
    )

    if role == "STUDENT":
        StudentRepository.create_new_student_account(
            student_id=auth_user_data["email"].split("@")[0], account=account
        )

    if role == "STAFF":
        StaffRepository.create_new_staff_account(account=account)

    # TODO: Add more roles

    return account
