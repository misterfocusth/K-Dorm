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


def get_serializer_class(request):
    if request.method == "POST":
        return CreateSerializer
    elif request.method == "PUT":
        return UpdateSerializer
    return MaintenanceSerializer


def serialize(data, many=False):
    serializer = MaintenanceSerializer(data, many=many)
    return serializer.data


class MaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceTicket
        fields = "__all__"

    files = FileSerializer(many=True, read_only=True)
    assignedBy = StudentSerializer(many=False, read_only=True, source="student")
    assignedTo = _nested_maintenanceStaffWithAccountSerializer(
        many=False, read_only=True, source="maintenanceStaff"
    )


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
