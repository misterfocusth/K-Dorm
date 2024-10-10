# Django REST Framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

# Exceptions
from rest_framework.exceptions import AuthenticationFailed

# Model
from domain.models import Account

# Serializers
from authentication.serializers.auth_user import AuthUserSerializer

# Firebase
from firebase_admin import auth

# Utils
import utils.account_utils as account_utils
import utils.token as token_utils

# Repository
import repositories.account_repository as account_repository

# Interface
from interfaces.api_response import APIResponse
from interfaces.error_response import ErrorResponse


@api_view(['GET'])
def get_current_user(request):
    try:
        session_token = token_utils.get_session_id_token(request)
        decoded_token = auth.verify_id_token(
            session_token, clock_skew_seconds=30)
        uid = decoded_token['uid']

        account = account_repository.get_account_by_uid(uid)

        if account is None:
            raise AuthenticationFailed("User not found")

        serializer = AuthUserSerializer(account)
        user_data = serializer.data

        role = account_utils.get_user_role(user_data)

        return APIResponse(status=status.HTTP_200_OK, data={"user": user_data, "role": role})
    except AuthenticationFailed as e:
        return ErrorResponse(status=status.HTTP_401_UNAUTHORIZED, error="UNAUTHORIZED", message=str(e))
    except Exception as e:
        return ErrorResponse(status=status.HTTP_401_UNAUTHORIZED, error="UNAUTHORIZED", message=str(e))
