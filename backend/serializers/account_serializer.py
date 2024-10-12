# Django REST Framework
from rest_framework import serializers

# Models
from domain.models import Student, Staff, MaintenanceStaff, SecurityStaff, Account


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
