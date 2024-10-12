# Django REST Framework
from rest_framework.decorators import api_view
from rest_framework import status

# Use-Cases
from use_cases.maintenance.handle_create_maintenance_ticket import handle_create_maintenance_ticket
from use_cases.maintenance.handle_get_maintenance_tickets import handle_get_student_maintenance_tickets, handle_get_all_maintenance_tickets

# Interfaces
from interfaces.api_response import APIResponse
from interfaces.error_response import ErrorResponse

# Serializer
from serializers.maintenance_serializer import get_serializer_class, serialize

# Decorators
from middleware.decorators.authenticated_user_only import authenticated_user_only


@api_view(['POST', 'GET'])
@authenticated_user_only
def student_maintenance_ticket(request):
    try:
        if request.method == 'POST':
            serializer_class = get_serializer_class(request=request)
            serializer = serializer_class(data=request.data)

            if serializer.is_valid():
                result = handle_create_maintenance_ticket(
                    request, serializer)
                serialized_data = serialize(data=result)
                return APIResponse(status=status.HTTP_200_OK, data=serialized_data)
            else:
                return ErrorResponse(status=status.HTTP_400_BAD_REQUEST, error="BAD_REQUEST", message=serializer.errors)

        if request.method == 'GET':
            result = handle_get_student_maintenance_tickets(request)
            serialized_data = serialize(data=result, many=True)
            return APIResponse(status=status.HTTP_200_OK, data=serialized_data)
    except Exception as e:
        return ErrorResponse(status=status.HTTP_500_INTERNAL_SERVER_ERROR, error="INTERNAL_SERVER_ERROR", message=str(e))


@api_view(['POST', 'GET'])
@authenticated_user_only
def staff_maintenance_tickets(request):
    try:
        if request.method == 'GET':
            result = handle_get_all_maintenance_tickets(request)
            serialized_data = serialize(data=result)
            return APIResponse(status=status.HTTP_200_OK, data=serialized_data)
    except Exception as e:
        return ErrorResponse(status=status.HTTP_500_INTERNAL_SERVER_ERROR, error="INTERNAL_SERVER_ERROR", message=str(e))
