# Django REST Framework
from rest_framework import serializers

# Models
from domain.models import Student, Staff, MaintenanceStaff, SecurityStaff, Account


def get_serializer_class(request):
    if request.method == 'POST':
        return CreateSerializer
    elif request.method == 'PUT':
        return UpdateSerializer
    return AccountSerializer


def serialize(data, many=False):
    serializer = AccountSerializer(data, many=many)
    return serializer.data


class CreateSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    firstName = serializers.CharField(required=True)
    lastName = serializers.CharField(required=True)
    type = serializers.CharField(required=True)

    def validate_email(self, value):
        if Account.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Staff with this ID already exists.")
        else:
            return value


class UpdateSerializer(serializers.Serializer):
    firstName = serializers.CharField()
    lastName = serializers.CharField()
    type = serializers.CharField()
    isDisabled = serializers.BooleanField()
    email = serializers.EmailField()


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

    account = AccountSerializer()


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'


class MaintenanceStaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceStaff
        fields = '__all__'


class SecurityStaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = SecurityStaff
        fields = '__all__'
