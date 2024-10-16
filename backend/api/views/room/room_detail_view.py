from rest_framework.decorators import api_view
from rest_framework import serializers
from api.use_case.room import room_uc
from serializers.utils import serialize_unwrap
from domain.models import Building, Room
from domain.models import Room
from exception.application_logic.server.Illegal_operation import (
    IllegalOperationException,
)
from exception.application_logic.server.base import UnexpectedException
from interfaces.api_response import APIResponse
from interfaces.request_with_context import RequestWithContext
from layer.handle import handle


class EditRoomPayloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["floor", "name"]


class _nested_building_RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ["id", "name"]


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["id", "floor", "name", "building"]

    building = _nested_building_RoomSerializer()


@api_view(["GET", "PATCH", "DELETE"])
@handle(only_authenticated=True, serializer_config={"PATCH": EditRoomPayloadSerializer})
def view(request: RequestWithContext, room_id: str):
    print(request.method)
    if request.method == "GET":
        room = room_uc.get_by_id(request, room_id)
        response = serialize_unwrap(room, RoomSerializer)
        return APIResponse(response)

    elif request.method == "PATCH":
        payload = request.ctx.store["BODY"]
        print(payload)
        room = room_uc.edit(
            request,
            room_id,
            floor=payload.get("floor"),
            name=payload.get("name"),
        )
        print(room)
        response = serialize_unwrap(room, RoomSerializer)
        return APIResponse(response)

    elif request.method == "DELETE":
        print(request.method)
        room = room_uc.delete(request, room_id)
        return APIResponse({"message": "Room deleted"})

    raise IllegalOperationException("Method not allowed")
