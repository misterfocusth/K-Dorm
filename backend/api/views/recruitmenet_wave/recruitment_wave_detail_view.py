from rest_framework import serializers
from rest_framework.decorators import api_view
from backend.api.repository import recruitment_wave_repository
from backend.api.use_case.recruitment_wave import recruitment_wave_uc
from backend.domain.models import RecruitmentWave
from backend.exception.application_logic.server.Illegal_operation import (
    IllegalOperationException,
)
from backend.interfaces.api_response import APIResponse
from backend.interfaces.request_with_context import RequestWithContext
from backend.layer.handle import handle
from backend.serializers.utils import serialize_unwrap


class EditRecruitmentWavePayloadSerializer(serializers.Serializer):
    name = serializers.CharField(allow_null=True)
    year = serializers.IntegerField(allow_null=True)
    announcementText = serializers.CharField(allow_null=True)


class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecruitmentWave
        fields = "__all__"


@api_view(["GET", "PATCH", "DELETE"])
@handle(
    only_authenticated=True,
    serializer_config={"BODY": EditRecruitmentWavePayloadSerializer},
)
def view(request: RequestWithContext, wave_id: str):
    if request.method == "GET":
        wave = recruitment_wave_uc.get_by_id(request, wave_id)
        response = serialize_unwrap(wave, ResponseSerializer)
        return APIResponse(response)
    if request.method == "PATCH":
        body = request.ctx.store["BODY"]
        wave = recruitment_wave_uc.edit(request, wave_id, body)
        response = serialize_unwrap(wave, ResponseSerializer)
        return APIResponse(response)
    if request.method == "DELETE":
        recruitment_wave_uc.delete(request, wave_id)
        return APIResponse(None)

    raise IllegalOperationException()
