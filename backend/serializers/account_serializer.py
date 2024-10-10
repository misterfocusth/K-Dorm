# Django REST Framework
from rest_framework import serializers

# Models
from domain.models import Student, Staff, MaintenanceStaff, SecurityStaff


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


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
