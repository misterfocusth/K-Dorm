from rest_framework import serializers
from rest_framework.decorators import api_view
from api.use_case.room import room_uc
from domain.models import Room
from exception.application_logic.server.base import UnexpectedException
from interfaces.api_response import APIResponse
from interfaces.request_with_context import RequestWithContext
from layer.handle import handle


class _nested_CreateRoomPayloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["floor", "name", "building_id"]


class CreateRoomPayloadSerializer(serializers.Serializer):
    rooms = _nested_CreateRoomPayloadSerializer(many=True)


class _nested_CreateRoomPayloadResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["floor", "name", "building_id", "id"]


class CreateRoomResponseSerializer(serializers.ModelSerializer):
    rooms = _nested_CreateRoomPayloadResponseSerializer(many=True)


@api_view(["POST"])
@handle(
    only_authenticated=True,
    only_role=["STAFF"],
    serializer_config={"BODY": CreateRoomPayloadSerializer},
)
def view(request: RequestWithContext):
    payload = request.ctx.store["BODY"]

    to_create_rooms = payload["rooms"]

    rooms = room_uc.createMany(request, to_create_rooms)

    response = CreateRoomResponseSerializer(rooms)

    return APIResponse(response.data, status=201)
