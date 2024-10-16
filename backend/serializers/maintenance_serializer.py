# Django REST Framework
from rest_framework import serializers

# Model
from domain.models import MaintenanceTicket

# Serializer
from serializers.account_serializer import (
    StudentSerializer,
    _nested_maintenanceStaffWithAccountSerializer,
)
from serializers.file_serializer import FileSerializer


def serialize(data, many=False):
    serializer = MaintenanceSerializer(data, many=many)
    return serializer.data


class MaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceTicket
        fields = "__all__"

    files = FileSerializer(many=True, read_only=True)
    assignedBy = StudentSerializer(
        many=False, read_only=True, source="student")
    assignedTo = _nested_maintenanceStaffWithAccountSerializer(
        many=False, read_only=True, source="maintenanceStaff"
    )
