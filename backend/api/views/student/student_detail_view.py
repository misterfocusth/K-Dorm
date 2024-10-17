from rest_framework import serializers
from rest_framework.decorators import api_view

from api.use_case.auth import auth_uc
from api.use_case.student import student_uc
from exception.application_logic.client.bad_request import BadRequestException
from exception.application_logic.server.Illegal_operation import (
    IllegalOperationException,
)
from exception.auth.unauthenticated import UnauthenticatedException
from serializers.utils import serialize_unwrap
from domain.models import Account, Student
from interfaces.api_response import APIResponse
from layer.handle import handle

"""Get requester student info"""
from interfaces.request_with_context import RequestWithContext


class _nested_studentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["studentId", "isOnBoarded", "id"]


class GetInfoResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = [
            "email",
            "firstName",
            "lastName",
            "uid",
            "isDisabled",
            "student",
            "id",
        ]

    student = _nested_studentSerializer()


class EditStudentSerializer_ByStudent(serializers.Serializer):
    firstName = serializers.CharField(allow_null=True)
    lastName = serializers.CharField(allow_null=True)


class EditStudentSerializer_ByStaff(serializers.Serializer):
    email = serializers.EmailField(allow_null=True)
    firstName = serializers.CharField(allow_null=True)
    lastName = serializers.CharField(allow_null=True)
    studentId = serializers.CharField(allow_null=True)


@api_view(["GET", "PATCH", "DELETE"])
@handle(only_role=["STUDENT", "STAFF"], only_authenticated=True)
def view(request: RequestWithContext, pk: str):

    user = request.ctx.user
    if not user:
        raise UnauthenticatedException("Not logged in")

    if request.method == "GET":
        student = student_uc.get_by_id(request, pk)

        response = serialize_unwrap(student, GetInfoResponseSerializer)
        return APIResponse(response, status=200)

    if request.method == "PATCH":
        if auth_uc.is_student(request, user.pk):
            payload = EditStudentSerializer_ByStudent(data=request.data)
            if not payload.is_valid():
                raise BadRequestException("Invalid payload")
            studnet = student_uc.edit_student(request, pk, payload.validated_data)  # type: ignore
            response = serialize_unwrap(studnet, GetInfoResponseSerializer)
            return APIResponse(response, status=200)
        if auth_uc.is_staff(request, user.pk):
            payload = EditStudentSerializer_ByStaff(data=request.data)
            if not payload.is_valid():
                raise BadRequestException("Invalid payload")
            studnet = student_uc.edit_student(request, pk, payload.validated_data)  # type: ignore
            response = serialize_unwrap(studnet, GetInfoResponseSerializer)
            return APIResponse(response, status=200)
        raise IllegalOperationException()

    if request.method == "DELETE" and auth_uc.is_staff(request, user.pk):
        student_uc.delete_by_id(request, pk)
        return APIResponse(None, status=204)

    raise IllegalOperationException()
