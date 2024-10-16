# Django REST Framework
from rest_framework import serializers

# Models
from domain.models import File


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"
