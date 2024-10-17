from rest_framework import serializers
from rest_framework.decorators import api_view
from api.use_case.activity import activity_uc
from exception.application_logic.server.Illegal_operation import IllegalOperationException
from serializers.utils import serialize_unwrap
from domain.models import ActivityCategory, Activity
from exception.application_logic.server.base import UnexpectedException
from interfaces.api_response import APIResponse
from interfaces.request_with_context import RequestWithContext
from layer.handle import handle
from domain.models import Student
from serializers.account_serializer import StudentSerializer


class ActivityCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityCategory
        fields = "__all__"


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"

    categories = ActivityCategorySerializer(many=True)
    student = StudentSerializer(many=False)


class CreateActivityPayloadSerializer(serializers.Serializer):
    name = serializers.CharField()
    note = serializers.CharField()
    location = serializers.CharField()
    earnedVolunteerHours = serializers.FloatField()
    studentId = serializers.CharField()
    categories = serializers.ListField(child=serializers.CharField())


@api_view(["POST"])
@handle(
    only_authenticated=True,
    only_role=["STAFF", "STUDENT"],
    serializer_config={"BODY": CreateActivityPayloadSerializer},
)
def view(request: RequestWithContext):
    payload = request.ctx.store["BODY"]

    to_create_activity = payload

    activity = activity_uc.create(request, to_create_activity)

    response = serialize_unwrap(activity, ActivitySerializer)

    return APIResponse(response)


@api_view(["GET", "POST"])
@handle(only_authenticated=True, only_role=["STAFF", "STUDENT"], serializer_config={"BODY": CreateActivityPayloadSerializer})
def with_student_id_view(request: RequestWithContext, student_id: str):
    if request.method == "GET":
        activities = activity_uc.get_by_student_id(request, student_id)
        response = serialize_unwrap(activities, ActivitySerializer, many=True)
        return APIResponse(response)
    elif request.method == "POST":
        payload = request.ctx.store["BODY"]
        payload["studentId"] = student_id

        to_create_activity = payload

        activity = activity_uc.create(request, to_create_activity)

        response = serialize_unwrap(activity, ActivitySerializer)

        return APIResponse(response)

    raise IllegalOperationException("Method not allowed")


@api_view(["GET", "POST"])
@handle(only_authenticated=True, only_role=["STAFF", "STUDENT"])
def with_activity_id_view(request: RequestWithContext, activity_id: str):
    if request.method == "GET":
        activity = activity_uc.get_by_id(request, int(activity_id))
        response = serialize_unwrap(activity, ActivitySerializer)
        return APIResponse(response)
    elif request.method == "POST":
        raise IllegalOperationException("Method not allowed")

    raise IllegalOperationException("Method not allowed")
