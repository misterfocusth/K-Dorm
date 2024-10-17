# from rest_framework import serializers
# from rest_framework.decorators import api_view
# from api.use_case.room import room_uc
# from serializers.utils import serialize_unwrap
# from domain.models import ActivityCategory, Activity
# from exception.application_logic.server.base import UnexpectedException
# from interfaces.api_response import APIResponse
# from interfaces.request_with_context import RequestWithContext
# from layer.handle import handle

# class ActivityCategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ActivityCategory
#         fields = "__all__"

# class ActivitySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Activity
#         fields = "__all__"

#     categories = ActivityCategorySerializer(many=True)

# class CreateActivityPayloadSerializer(serializers.Serializer):
#     name = serializers.CharField()
#     note = serializers.CharField()
#     date = serializers.DateTimeField()
#     location = serializers.CharField()
#     earnedVolunteerHours = serializers.FloatField()
#     categories = serializers.ListField(child=serializers.CharField())


# @api_view(["POST"])
# @handle(
#     only_authenticated=True,
#     only_role=["STAFF"],
#     serializer_config={"BODY": CreateActivityPayloadSerializer},
# )
# def view(request: RequestWithContext):
#     payload = request.ctx.store["BODY"]

#     to_create_activity = payload

#     activity = room_uc.create(request, to_create_activity)

#     response = serialize_unwrap(activity, ActivitySerializer)

#     return APIResponse(response)
