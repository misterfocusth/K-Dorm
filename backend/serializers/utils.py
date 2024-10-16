from typing import Any, Type
from rest_framework import serializers


def serialize_unwrap(data: Any, serializer: Type[serializers.Serializer], many=False):
    output = serializer(data, many=many)
    return output.data
