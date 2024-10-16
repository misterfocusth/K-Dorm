from rest_framework import serializers
from rest_framework.decorators import api_view
from backend.api.use_case.room import room_uc
from backend.domain.models import Room
from backend.exception.application_logic.server.base import UnexpectedException
from backend.interfaces.api_response import APIResponse
from backend.interfaces.request_with_context import RequestWithContext
from backend.layer.handle import handle


class CreateRoomPayloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["floor", "name", "building_id"]


class CreateRoomResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["id", "floor", "name", "building_id"]


@api_view(["POST"])
@handle(
    only_authenticated=True,
    only_role=["STAFF"],
    serializer_config={"BODY": CreateRoomPayloadSerializer},
)
def view(request: RequestWithContext):
    payload = request.ctx.store["BODY"]

    room = room_uc.create(
        request,
        floor=payload["floor"],
        name=payload["name"],
        building_id=payload["building_id"],
    )

    response = CreateRoomResponseSerializer(room)
    if not response.is_valid():
        raise UnexpectedException("Response is not valid")

    return APIResponse(response.validated_data, status=201)
