# Django REST Framework
from rest_framework import serializers

# Model
from domain.models import MaintenanceTicket

# Serializer
from serializers.account_serializer import StudentSerializer, MaintenanceStaffSerializer
from serializers.file_serializer import FileSerializer


def get_serializer_class(request):
    if request.method == 'POST':
        return CreateSerializer


def serialize(data):
    serializer = MaintenanceSerializer(data)
    return serializer.data


class MaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceTicket
        fields = '__all__'

    files = FileSerializer(many=True, read_only=True)
    student = StudentSerializer(many=False, read_only=True)
    maintenance_staff = MaintenanceStaffSerializer(many=False, read_only=True)


class CreateSerializer(serializers.Serializer):
    class Meta:
        model = MaintenanceTicket
        fields = '__all__'

    title = serializers.CharField(required=True)
    description = serializers.CharField(required=True)
    location = serializers.CharField()
    student_id = serializers.IntegerField(required=True)
    files = serializers.FileField(required=True)

    def validate_title(self, value):
        if len(value) < 5:
            raise serializers.ValidationError(
                'Title must be at least 5 characters long.')
        return value

    def validate_description(self, value):
        if len(value) < 10:
            raise serializers.ValidationError(
                'Description must be at least 10 characters long.')
        return value
