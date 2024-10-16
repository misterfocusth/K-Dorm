from rest_framework import serializers
from rest_framework.decorators import api_view
from api.use_case.activity_category import activity_category_uc
from exception.application_logic.server.Illegal_operation import IllegalOperationException
from serializers.utils import serialize_unwrap
from domain.models import ActivityCategory, Activity
from exception.application_logic.server.base import UnexpectedException
from interfaces.api_response import APIResponse
from interfaces.request_with_context import RequestWithContext
from layer.handle import handle


class ActivityCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityCategory
        fields = ["id", "handle", "name", "visibleToStudents",
                  "visibleToStaffs", "visibleToSecurityStaffs"]


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"

    categories = ActivityCategorySerializer(many=True)


class CreateActivityCategoryPayloadSerializer(serializers.Serializer):
    handle = serializers.CharField(required=True)
    name = serializers.CharField(required=True)
    visibleToStudents = serializers.BooleanField(required=True)
    visibleToStaffs = serializers.BooleanField(required=True)
    visibleToSecurityStaffs = serializers.BooleanField(required=True)


class EditActivityCategoryPayloadSerializer(serializers.Serializer):
    handle = serializers.CharField(required=False)
    name = serializers.CharField(required=False)
    visibleToStudents = serializers.BooleanField(required=False)
    visibleToStaffs = serializers.BooleanField(required=False)
    visibleToSecurityStaffs = serializers.BooleanField(required=False)


@api_view(["POST", "GET", "PUT", "DELETE"])
@handle(
    only_authenticated=True,
    only_role=["STAFF"],
    serializer_config={"BODY": CreateActivityCategoryPayloadSerializer,
                       "PUT": EditActivityCategoryPayloadSerializer},
)
def view(request: RequestWithContext):
    if request.method == "POST":
        payload = request.ctx.store["BODY"]
        activity = activity_category_uc.create(request, payload)
        response = serialize_unwrap(activity, ActivityCategorySerializer)
        return APIResponse(response)

    if request.method == "GET":
        activity_categories = activity_category_uc.get_list(request)
        response = serialize_unwrap(
            activity_categories, ActivityCategorySerializer, many=True)
        return APIResponse(response)

    raise IllegalOperationException("Method not allowed")


@api_view(["DELETE", "PUT"])
@handle(
    only_authenticated=True,
    only_role=["STAFF"],
    serializer_config={"PUT": EditActivityCategoryPayloadSerializer},
)
def detail_view(request: RequestWithContext, activity_category_id: str):
    if request.method == "DELETE":
        activity = activity_category_uc.delete_by_id(
            request, activity_category_id)
        response = serialize_unwrap(activity, ActivityCategorySerializer)
        return APIResponse(response)

    if request.method == "PUT":
        payload = request.ctx.store["BODY"]
        print(payload)
        activity = activity_category_uc.edit_by_id(
            request, activity_category_id=activity_category_id, payload=payload)
        response = serialize_unwrap(activity, ActivityCategorySerializer)
        return APIResponse(response)

    raise IllegalOperationException("Method not allowed")
