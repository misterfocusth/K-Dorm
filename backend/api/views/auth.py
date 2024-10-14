# Django REST Framework
from rest_framework.decorators import api_view
from rest_framework import status

# Exceptions
from rest_framework.exceptions import AuthenticationFailed

# Use-Cases

# Interfaces
from api.use_case.auth import auth_uc
from interfaces.request_with_context import RequestWithContext
from layer.handle import handle
from repositories.account import AccountRepository
from interfaces.api_response import APIResponse
from interfaces.error_response import ErrorResponse

# Serializer
from serializers.user_serializer import AuthUserSerializer

# Utils
from utils import account_utils


# Deprecated
@api_view(["POST"])
@handle()
def signin(request: RequestWithContext):
    try:
        account = request
        serializer = AuthUserSerializer(account)
        user_data = serializer.data
        role = account_utils.get_user_role(user_data)
        return APIResponse(
            status=status.HTTP_200_OK, data={"user": user_data, "role": role}
        )
    except AuthenticationFailed as e:
        return ErrorResponse(
            status=status.HTTP_401_UNAUTHORIZED, error="UNAUTHORIZED", message=str(e)
        )
    except Exception as e:
        return ErrorResponse(
            status=status.HTTP_401_UNAUTHORIZED, error="UNAUTHORIZED", message=str(e)
        )


@api_view(["GET"])
@handle()
def get_current_user(request: RequestWithContext):
    try:
        account = auth_uc.signin(request, request)
        serializer = AuthUserSerializer(account)
        user_data = serializer.data
        role = account_utils.get_user_role(user_data)
        return APIResponse(
            status=status.HTTP_200_OK, data={"user": user_data, "role": role}
        )
    except AuthenticationFailed as e:
        return ErrorResponse(
            status=status.HTTP_401_UNAUTHORIZED, error="UNAUTHORIZED", message=str(e)
        )
    except Exception as e:
        return ErrorResponse(
            status=status.HTTP_401_UNAUTHORIZED, error="UNAUTHORIZED", message=str(e)
        )
