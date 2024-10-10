# Django REST Framework
from rest_framework import status
from rest_framework.decorators import api_view

# Django
from django.db import transaction

# Exceptions
from rest_framework.exceptions import AuthenticationFailed

# Serializers
from authentication.serializers.auth_user import AuthUserSerializer

# Firebase
from firebase_admin import auth

# Repository
from repositories.account_repository import *

# Interface
from backend.interfaces.api_response import APIResponse
from backend.interfaces.error_response import ErrorResponse

# Utils
from utils.account_utils import get_user_role
import utils.token as token_utils

# Repository
import repositories.account_repository as account_repository


@transaction.atomic
def _create_new_account(auth_user_data, is_student=False, is_system_admin=False):
    first_name, last_name = "", ""

    if auth_user_data["display_name"] is not None:
        first_name = auth_user_data['display_name'].split(" ")[0]
        last_name = auth_user_data['display_name'].split(" ")[1]
    else:
        first_name = "System"
        last_name = "Admin"

    account = account_repository.create_new_account(
        uid=auth_user_data['uid'],
        email=auth_user_data['email'],
        firstName=first_name,
        lastName=last_name,
    )

    if is_student:
        account_repository.create_new_student_account(
            studentId=auth_user_data['email'].split("@")[0],
            account=account
        )

    if is_system_admin:
        account_repository.create_new_staff_account(
            account=account
        )

    return account


@api_view(['POST'])
def signin(request):
    try:
        session_token = token_utils.get_session_id_token(request)

        decoded_token = auth.verify_id_token(
            session_token, clock_skew_seconds=30)
        uid = decoded_token['uid']

        user = auth.get_user(uid)

        auth_user_data = {
            'uid': user.uid,
            'email': user.email,
            'display_name': user.display_name,
            'photo_url': user.photo_url,
        }

        # Check if user exists in the database
        account = account_repository.get_account_by_uid(uid)

        if account is None and auth_user_data['email'] == 'admin@kmitl.ac.th':
            _create_new_account(
                auth_user_data=auth_user_data, is_system_admin=True)
        elif account is None:
            account = _create_new_account(
                auth_user_data=auth_user_data, is_student=True)

        serializer = AuthUserSerializer(account)
        user_data = serializer.data
        role = get_user_role(user_data)

        return APIResponse(status=status.HTTP_200_OK, data={"user": user_data, "role": role})
    except AuthenticationFailed as e:
        return ErrorResponse(status=status.HTTP_401_UNAUTHORIZED, error="UNAUTHORIZED", message=str(e))
    except Exception as e:
        return ErrorResponse(status=status.HTTP_401_UNAUTHORIZED, error="UNAUTHORIZED", message=str(e))
