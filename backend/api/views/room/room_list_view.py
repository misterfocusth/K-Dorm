from rest_framework import serializers
from rest_framework.decorators import api_view
from api.use_case.room import room_uc
from serializers.utils import serialize_unwrap
from domain.models import Room
from exception.application_logic.server.base import UnexpectedException
from interfaces.api_response import APIResponse
from interfaces.request_with_context import RequestWithContext
from layer.handle import handle


class _nested_CreateRoomPayloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["floor", "name", "building_id"]

    building_id = serializers.CharField()


class CreateRoomPayloadSerializer(serializers.Serializer):
    rooms = _nested_CreateRoomPayloadSerializer(many=True)


class _nested_CreateRoomPayloadResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["floor", "name", "building_id", "id"]


class CreateRoomResponseSerializer(serializers.Serializer):
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

    print(to_create_rooms)
    rooms = room_uc.createMany(request, to_create_rooms)

    response = serialize_unwrap({"rooms": rooms}, CreateRoomResponseSerializer)

    return APIResponse(response, status=201)
