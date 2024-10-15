from rest_framework.decorators import api_view

from api.use_case.auth import auth_uc
from interfaces.request_with_context import RequestWithContext
from layer.handle import handle

from rest_framework import serializers


class CreateStudentSerializer:
    email = serializers.EmailField()
    firstName = serializers.CharField(max_length=255)
    lastName = serializers.CharField(max_length=255)


@api_view(["POST"])
@handle(only_role=["STAFF"])
def create_new_student(request: RequestWithContext):
    auth_uc.create_account(
        request, auth_user_data=request.ctx.store["BODY_data"], role="STUDENT"
    )
