from urllib import response
from rest_framework.decorators import api_view

from api.use_case.auth import auth_uc
from api.use_case.student import student_uc
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
    class Meta(models.Student.Meta):
        fields = ["studentId", "isOnBoarded"]


class CreateStudentSerializerResponse(serializers.ModelSerializer):

    student = _studentSerializer()

    class Meta:
        model = models.Student
        fields = ["email", "firstName", "lastName", "uid", "isDisabled"]


@api_view(["POST"])
@handle(only_role=["STAFF"], serializer_config={"BODY": CreateStudentSerializerPayload})
def create_students(request: RequestWithContext):
    accounts = student_uc.create_students(
        request, payloads=request.ctx.store["BODY"]["students"]
    )

    response_serializer = CreateStudentSerializerResponse(accounts, many=True)

    return APIResponse(response_serializer.data, status=201)


class EditStudentSerializer(serializers.Serializer):
    email = serializers.EmailField(allow_null=True)
    firstName = serializers.CharField(allow_null=True)
    lastName = serializers.CharField(allow_null=True)
    studentId = serializers.CharField(allow_null=True)


@api_view(["PATCH"])
@handle(serializer_config={"BODY": EditStudentSerializer})
def edit_student(request: RequestWithContext, student_pk: str):

    student = student_uc.edit_student(
        request, student_pk, payload=request.ctx.store["BODY"]
    )

    response_serializer = CreateStudentSerializerResponse(instance=student)

    return APIResponse(response_serializer.data, status=200)


@api_view(["POST"])
@handle(
    only_role=["STUDENT"],
)
def on_board_student(request: RequestWithContext):
    student = student_uc.onboard(request)
    response_serializer = CreateStudentSerializerResponse(instance=student)
    return APIResponse(response_serializer.data, status=200)
