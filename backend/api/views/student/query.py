from rest_framework import serializers
from rest_framework.decorators import api_view
from backend.api.use_case.student import student_uc
from backend.domain.models import Account, Student
from backend.interfaces.api_response import APIResponse
from layer.handle import handle

"""Get requester student info"""
from backend.interfaces.request_with_context import RequestWithContext


class _nested_studentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["studentId", "isOnBoarded"]


class GetInfoResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ["email", "firstName", "lastName", "uid", "isDisabled"]

    student = _nested_studentSerializer()


@api_view(["GET"])
@handle(only_role=["STUDENT"], only_authenticated=True)
def get_info(request: RequestWithContext):
    student = student_uc.get_student_from_ctx(request)

    student_serializer = GetInfoResponseSerializer(instance=student)

    return APIResponse(student_serializer.validated_data, status=200)
