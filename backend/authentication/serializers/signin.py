# Django REST Framework
from rest_framework import serializers
from rest_framework.generics import GenericAPIView

# Models
from api.models import Account

# Serializers
from api.serializers.account import MaintenanceStaffSerializer, SecurityStaffSerializer, StaffSerializer, StudentSerializer


class PostSignInSerializer(serializers.Serializer):
    session_token = serializers.CharField(required=True)
