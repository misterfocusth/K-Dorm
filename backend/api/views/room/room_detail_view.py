from rest_framework.decorators import api_view
from rest_framework import serializers
from backend.api.use_case.room import room_uc
from backend.domain.models import Room
from backend.exception.application_logic.server.Illegal_operation import (
    IllegalOperationException,
)
from backend.exception.application_logic.server.base import UnexpectedException
from backend.interfaces.api_response import APIResponse
from backend.interfaces.request_with_context import RequestWithContext
from backend.layer.handle import handle


class EditRoomPayloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["floor", "name"]


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["id", "floor", "name"]


@api_view(["GET", "PATCH", "DELETE"])
@handle(only_authenticated=True, serializer_config={"BODY": EditRoomPayloadSerializer})
def view(request: RequestWithContext, room_id: str):
    if request.method == "GET":
        room = room_uc.get_by_id(request, room_id)
        response = RoomSerializer(room)
        if not response.is_valid():
            raise UnexpectedException("Response is not valid")
        return APIResponse(response.validated_data)
    elif request.method == "PATCH":
        payload = request.ctx.store["BODY"]
        room = room_uc.edit(
            request, room_id, floor=payload["floor"], name=payload["name"]
        )
        response = RoomSerializer(room)
        if not response.is_valid():
            raise UnexpectedException("Response is not valid")
        return APIResponse(response.validated_data)
    elif request.method == "DELETE":
        room = room_uc.delete(request, room_id)
        return APIResponse(None)

    raise IllegalOperationException("Method not allowed")
