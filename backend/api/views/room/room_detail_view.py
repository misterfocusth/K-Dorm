from rest_framework.decorators import api_view
from rest_framework import serializers
from api.use_case.room import room_uc
from domain.models import Building, Room
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

    building_id = serializers.CharField(allow_null=True)


class _nested_building_RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ["id", "name"]


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["id", "floor", "name"]

    building = _nested_building_RoomSerializer()


@api_view(["GET", "PATCH", "DELETE"])
@handle(only_authenticated=True, serializer_config={"BODY": EditRoomPayloadSerializer})
def view(request: RequestWithContext, room_id: str):
    if request.method == "GET":
        room = room_uc.get_by_id(request, room_id)
        response = RoomSerializer(room)
        return APIResponse(response.data)

    elif request.method == "PATCH":
        payload = request.ctx.store["BODY"]
        room = room_uc.edit(
            request,
            room_id,
            floor=payload.get("floor"),
            name=payload.get("name"),
            building_id=payload.get("building_id"),
        )
        response = RoomSerializer(room)
        return APIResponse(response.data)

    elif request.method == "DELETE":
        room = room_uc.delete(request, room_id)
        return APIResponse(None)

    raise IllegalOperationException("Method not allowed")
