# Django REST Framework
from typing import TypedDict
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
    uid: str
    email: str
    display_name: str
    photo_url: str


@transaction.atomic
@usecase()
def create_account(
    ctx: Context, auth_user_data: UserData, is_student=False, is_system_admin=False
):
    first_name, last_name = "", ""

    if auth_user_data["display_name"] is not None:
        first_name = auth_user_data["display_name"].split(" ")[0]
        last_name = auth_user_data["display_name"].split(" ")[1]
    else:
        first_name = "System"
        last_name = "Admin"

    account = AccountRepository.create_new_account(
        uid=auth_user_data["uid"],
        email=auth_user_data["email"],
        first_name=first_name,
        last_name=last_name,
    )

    if is_student:
        StudentRepository.create_new_student_account(
            student_id=auth_user_data["email"].split("@")[0], account=account
        )

    if is_system_admin:
        StaffRepository.create_new_staff_account(account=account)

    return account
