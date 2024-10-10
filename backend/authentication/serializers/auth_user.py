# Django REST Framework
from rest_framework import serializers
from rest_framework.generics import GenericAPIView

# Models
from domain.models import Account

# Serializers
from api.serializers.account import MaintenanceStaffSerializer, SecurityStaffSerializer, StaffSerializer, StudentSerializer


class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

    student = StudentSerializer(many=False, read_only=True)
    staff = StaffSerializer(many=False, read_only=True)
    maintenanceStaff = MaintenanceStaffSerializer(many=False, read_only=True)
    securityStaff = SecurityStaffSerializer(many=False, read_only=True)
