# Django REST Framework
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework import serializers

# Exceptions
from rest_framework.exceptions import AuthenticationFailed

# Use-Cases

# Interfaces
from api.use_case.auth import auth_uc
from api.views import account
from domain.models import Account
from serializers.account_serializer import (
    MaintenanceStaffSerializer,
    SecurityStaffSerializer,
    StaffSerializer,
    StudentSerializer,
)
from interfaces.request_with_context import RequestWithContext
from layer.handle import handle
from api.repository.account import AccountRepository
from interfaces.api_response import APIResponse
from interfaces.error_response import ErrorResponse


# Utils
from utils import account_utils


# Deprecated
@api_view(["POST"])
@handle()
def signin(request: RequestWithContext):
    account = request.ctx.user
    serializer = AuthUserSerializer(account)
    user_data = serializer.data
    role = account_utils.get_user_role(user_data)
    return APIResponse(
        status=status.HTTP_200_OK, data={"user": user_data, "role": role}
    )


class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = "__all__"

    student = StudentSerializer(many=False, read_only=True)
    staff = StaffSerializer(many=False, read_only=True)
    maintenanceStaff = MaintenanceStaffSerializer(many=False, read_only=True)
    securityStaff = SecurityStaffSerializer(many=False, read_only=True)


@api_view(["GET"])
@handle()
def get_current_user(request: RequestWithContext):
    auth_uc.get_user_from_request(request, request)
    serializer = AuthUserSerializer(account)
    user_data = serializer.data
    role = account_utils.get_user_role(user_data)
    return APIResponse(
        status=status.HTTP_200_OK, data={"user": user_data, "role": role}
    )
