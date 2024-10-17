from typing import List
from urllib import response
from rest_framework.decorators import api_view

from api.use_case.auth import auth_uc
from api.use_case.student import student_uc
from api.views.student.student_detail_view import GetInfoResponseSerializer
from exception.auth.unauthenticated import UnauthenticatedException
from exception.application_logic.server.Illegal_operation import (
    IllegalOperationException,
)
from serializers.utils import serialize_unwrap
from domain import models
from interfaces.api_response import APIResponse
from interfaces.request_with_context import RequestWithContext
from layer.handle import handle

from rest_framework import serializers


class _nested_CreateStudentSerializerPayload(serializers.Serializer):
    email = serializers.EmailField()
    firstName = serializers.CharField(max_length=255)
    lastName = serializers.CharField(max_length=255)
    studentId = serializers.CharField(max_length=255)


class CreateStudentSerializerPayload(serializers.Serializer):
    students = serializers.ListField(child=_nested_CreateStudentSerializerPayload())


class _studentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = ["studentId", "isOnBoarded", "id"]


class _nested_CreateStudentResponse(serializers.ModelSerializer):

    student = _studentSerializer()

    class Meta:
        model = models.Account
        fields = [
            "id",
            "email",
            "firstName",
            "lastName",
            "uid",
            "isDisabled",
            "student",
        ]


class CreateStudentSerializerResponse(serializers.Serializer):
    students = _nested_CreateStudentResponse(many=True)


class GetAllResponseSerializer(serializers.Serializer):
    students = GetInfoResponseSerializer(many=True)


@api_view(["GET", "POST"])
@handle(
    only_role=["STAFF"],
    only_authenticated=True,
    serializer_config={"BODY": CreateStudentSerializerPayload},
)
def view(request: RequestWithContext):

    user = request.ctx.user
    if not user:
        raise UnauthenticatedException("Not logged in")

    is_staff = auth_uc.is_staff(request, user.pk)

    if request.method == "GET" and is_staff:
        accounts = student_uc.get_students_as_account(request)

        response = serialize_unwrap({"students": accounts}, GetAllResponseSerializer)

        return APIResponse(response, status=200)

    if request.method == "POST" and is_staff:
        accounts = student_uc.create_students(
            request, payloads=request.ctx.store["BODY"]["students"]
        )

        response = serialize_unwrap(
            {"students": accounts}, CreateStudentSerializerResponse
        )

        return APIResponse(response, status=201)

    raise IllegalOperationException()
