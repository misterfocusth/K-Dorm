from rest_framework import serializers
from rest_framework.decorators import api_view
from backend.api.use_case.building import building_uc
from backend.api.views.student import serializer
from backend.domain.models import Building, Room
from backend.exception.application_logic.server.Illegal_operation import (
    IllegalOperationException,
)
from backend.exception.application_logic.server.base import UnexpectedException
from backend.interfaces.api_response import APIResponse
from backend.interfaces.request_with_context import RequestWithContext
from backend.layer.handle import handle


class CreateBuildingPayloadSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)


class GetBuildingResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ["id", "name"]


@api_view(["GET", "POST"])
@handle(
    serializer_config={"BODY": CreateBuildingPayloadSerializer},
    only_authenticated=True,
    only_role=["STAFF"],
)
def view(request: RequestWithContext):
    if request.method == "GET":
        buildings = building_uc.get_list(request)

        response = GetBuildingResponseSerializer(buildings, many=True)
        if not response.is_valid():
            raise UnexpectedException("Response is not valid")

        return APIResponse(response.validated_data)

    elif request.method == "POST":
        building = building_uc.create(request, name=request.ctx.store["BODY"]["name"])

        response = GetBuildingResponseSerializer(building)
        if not response.is_valid():
            raise UnexpectedException("Response is not valid")

        return APIResponse(response.validated_data, status=201)

    raise IllegalOperationException("Method not allowed")
