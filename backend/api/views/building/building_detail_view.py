from rest_framework import serializers
from rest_framework.decorators import api_view

from api.use_case.auth import auth_uc
from api.use_case.building import building_uc
from api.repository.residence_repository import ResidenceRepository
from api.repository.room_repository import RoomRepository
from api.use_case.residence import residence_uc
from api.use_case.room import room_uc
from exception.application_logic.client.not_found import NotFoundException
from serializers.utils import serialize_unwrap
from domain.models import Building, Room
from exception.application_logic.server.Illegal_operation import (
    IllegalOperationException,
)
from exception.auth.unauthenticated import UnauthenticatedException
from exception.permission.unauthorized_action import UnauthorizedActionException
from interfaces.api_response import APIResponse
from interfaces.request_with_context import RequestWithContext
from layer.handle import handle


class _nested_rooms_GetBuildingResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["id", "floor", "name", "is_occupied"]

    is_occupied = serializers.BooleanField()


class GetBuildingWithRoomsResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ["id", "name", "rooms"]

    rooms = _nested_rooms_GetBuildingResponseSerializer(many=True)


class EditBuildingSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)


class GetBuildingInfoResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ["id", "name"]


@api_view(["PATCH", "GET", "DELETE"])
@handle(
    serializer_config={"BODY": EditBuildingSerializer},
    only_authenticated=True,
)
def staff_view(request: RequestWithContext, building_id: str):

    user = request.ctx.user
    if user == None:
        raise UnauthenticatedException("User not authenticated")

    if user.uid == None:
        raise UnauthenticatedException("User not authenticated")

    # Get all rooms
    if request.method == "GET":
        building = building_uc.get_by_id(request, building_id)

        if building == None:
            raise NotFoundException("Invalid building id")

        rooms = room_uc.get_by_building_id(request, building_id)

        for room in rooms:
            residences = residence_uc.get_current_by_room_id(request, room_id=room.pk)
            room.is_occupied = len(residences) > 0  # type: ignore

        response = serialize_unwrap(
            {"id": building.pk, "name": building.name, "rooms": rooms},
            GetBuildingWithRoomsResponseSerializer,
        )

        return APIResponse(response)

    is_staff = auth_uc.is_staff(request, user.pk)

    # Edit
    if request.method == "PATCH" and is_staff:
        payload = request.ctx.store["BODY"]
        building = building_uc.edit(request, building_id, name=payload["name"])

        response = serialize_unwrap(building, GetBuildingInfoResponseSerializer)

        return APIResponse(response)

    # Delete
    if request.method == "DELETE" and is_staff:
        building = building_uc.delete(request, building_id)

        return APIResponse(None)

    if not is_staff:
        raise UnauthorizedActionException("User must be staff to perform this action")

    raise IllegalOperationException("Method not allowed")


@api_view(["GET"])
@handle(only_authenticated=True)
def view(request: RequestWithContext, building_id: str):

    building = building_uc.get_by_id(request, building_id)
    if building == None:
        raise NotFoundException("Invalid building id")

    response = serialize_unwrap(building, GetBuildingInfoResponseSerializer)

    return APIResponse(response)
