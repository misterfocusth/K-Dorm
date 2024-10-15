# Django REST Framework
from rest_framework.decorators import api_view
from rest_framework.request import Request

# Django
from django.db import transaction

# Firebase
from firebase_admin import auth

# Utils
from exception.auth.account_doesnt_exist import AccountDoesntExistException
from interfaces.context import Context
from layer.use_case import usecase
import utils.token as token_utils

# Repository
from api.repository.account import AccountRepository


@usecase()
def signin(ctx: Context, request: Request):
    session_token = token_utils.get_session_id_token(request)

    decoded_token = auth.verify_id_token(session_token, clock_skew_seconds=30)
    uid = decoded_token["uid"]

    # auth_user_data = {
    #     "uid": user.uid,
    #     "email": user.email,
    #     "display_name": user.display_name,
    #     "photo_url": user.photo_url,
    # }

    # Check if user exists in the database
    account = AccountRepository.get_account_by_uid(uid)
    if account is None:
        raise AccountDoesntExistException(
            "No account found with given credentials")

    # if account is None and auth_user_data["email"] == "admin@kmitl.ac.th":
    #     _create_new_account(auth_user_data=auth_user_data, is_system_admin=True)
    # elif account is None:
    #     account = _create_new_account(auth_user_data=auth_user_data, is_student=True)

    return account
