from rest_framework import serializers
from rest_framework.decorators import api_view

from api.use_case.auth import auth_uc
from api.use_case.building import building_uc
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
        fields = ["id", "floor", "name"]


class GetBuildingResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ["id", "name"]

    rooms = _nested_rooms_GetBuildingResponseSerializer(many=True)


class EditBuildingSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)


@api_view(["PATCH", "GET", "DELETE"])
@handle(
    serializer_config={"BODY": EditBuildingSerializer},
    only_authenticated=True,
)
def view(request: RequestWithContext, building_id: str):

    user = request.ctx.user
    if user == None:
        raise UnauthenticatedException("User not authenticated")

    if user.uid == None:
        raise UnauthenticatedException("User not authenticated")

    # GET
    if request.method == "GET":
        building = building_uc.get_by_id(request, building_id)
        return APIResponse(building)

    is_staff = auth_uc.is_staff(request, user.pk)

    # Edit
    if request.method == "PATCH" and is_staff:
        payload = request.ctx.store["BODY"]
        building = building_uc.edit(request, building_id, name=payload["name"])
        return APIResponse(building)

    # Delete
    if request.method == "DELETE" and is_staff:
        building = building_uc.delete(request, building_id)
        return APIResponse(building)

    if not is_staff:
        raise UnauthorizedActionException(
            "User must be staff to perform this action")

    raise IllegalOperationException("Method not allowed")
