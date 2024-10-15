# Django REST Framework
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework import serializers

# Use-Cases
from backend.api.use_case.maintenance import maintenance_uc
from backend.domain.models import MaintenanceTicket
from backend.exception.application_logic.client.not_found import NotFoundException
from backend.exception.application_logic.server.Illegal_operation import (
    IllegalOperationException,
)
from interfaces.request_with_context import RequestWithContext

# Interfaces
from interfaces.api_response import APIResponse
from interfaces.error_response import ErrorResponse

# Serializer
from serializers.maintenance_serializer import (
    MaintenanceSerializer,
    serialize,
)

# Decorators
from layer.handle import handle


class CreateSerializer(serializers.Serializer):
    class Meta:
        model = MaintenanceTicket
        fields = "__all__"

    title = serializers.CharField(required=True)
    description = serializers.CharField(required=True)
    location = serializers.CharField()
    files = serializers.FileField(required=True)

    def validate_title(self, value):
        if len(value) < 5:
            raise serializers.ValidationError(
                "Title must be at least 5 characters long."
            )
        return value

    def validate_description(self, value):
        if len(value) < 10:
            raise serializers.ValidationError(
                "Description must be at least 10 characters long."
            )
        return value


@api_view(["POST", "GET"])
@handle(only_authenticated=True, serializer_config={"BODY": CreateSerializer})
def student_maintenance_ticket(
    request: RequestWithContext,
) -> APIResponse | ErrorResponse:
    if request.method == "POST":

        result = maintenance_uc.create_ticket(request, request.ctx.store["BODY"])
        serialized_data = MaintenanceSerializer(data=result).validated_data
        return APIResponse(status=status.HTTP_200_OK, data=serialized_data)

    if request.method == "GET":
        result = maintenance_uc.get_student_maintenance_tickets(request)
        serialized_data = MaintenanceSerializer(data=result, many=True).validated_data
        return APIResponse(status=status.HTTP_200_OK, data=serialized_data)

    raise IllegalOperationException()


class UpdateSerializer(serializers.Serializer):
    class Meta:
        model = MaintenanceTicket
        fields = "__all__"

    title = serializers.CharField(required=True)
    description = serializers.CharField(required=True)
    location = serializers.CharField(required=True)
    maintenanceStaffId = serializers.IntegerField(required=True)

    def validate_title(self, value):
        if len(value) < 5:
            raise serializers.ValidationError(
                "Title must be at least 5 characters long."
            )
        return value

    def validate_description(self, value):
        if len(value) < 10:
            raise serializers.ValidationError(
                "Description must be at least 10 characters long."
            )
        return value


@api_view(["GET", "PUT"])
@handle(only_authenticated=True, serializer_config={"BODY": UpdateSerializer})
def student_maintenance_ticket_detail(
    request: RequestWithContext, pk: str
) -> APIResponse | ErrorResponse:
    if request.method == "GET":
        result = maintenance_uc.get_maintenance_ticket_by_id(request, pk)
        if result is not None:
            serialized_data = UpdateSerializer(data=result).validated_data
            return APIResponse(status=status.HTTP_200_OK, data=serialized_data)
        else:
            raise NotFoundException(
                message="Maintenance ticket with id {} not found".format(pk)
            )
    elif request.method == "PUT":
        result = maintenance_uc.update_details(request, pk, request.ctx.store["BODY"])
        serialized_data = MaintenanceSerializer(data=result)
        return APIResponse(stsatus=status.HTTP_200_OK, data=serialized_data.data)
    raise IllegalOperationException()


@api_view(["POST", "GET"])
@handle(only_authenticated=True)
def staff_maintenance_tickets(request) -> APIResponse | ErrorResponse:
    try:
        if request.method == "GET":
            result = maintenance_uc.get_all_maintenance_tickets(request)
            serialized_data = serialize(data=result, many=True)
            return APIResponse(status=status.HTTP_200_OK, data=serialized_data)
    except Exception as e:
        return ErrorResponse(
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            error="INTERNAL_SERVER_ERROR",
            message=str(e),
        )

    return ErrorResponse(
        status=status.HTTP_405_METHOD_NOT_ALLOWED,
        error="METHOD_NOT_ALLOWED",
        message="Method not allowed",
    )
