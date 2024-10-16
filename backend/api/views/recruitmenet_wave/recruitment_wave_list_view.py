import rest_framework


from rest_framework import serializers
from rest_framework.decorators import api_view
from backend.api.use_case.recruitment_wave import recruitment_wave_uc
from backend.domain.models import RecruitmentWave
from backend.exception.application_logic.server.Illegal_operation import (
    IllegalOperationException,
)
from backend.interfaces.api_response import APIResponse
from backend.interfaces.request_with_context import RequestWithContext
from backend.serializers.utils import serialize_unwrap
from layer.handle import handle


class _recruitment_wave_serializer(serializers.ModelSerializer):
    class Meta:
        model = RecruitmentWave
        fields = "__all__"


class GetListResponse(serializers.Serializer):
    waves = _recruitment_wave_serializer(many=True)


class CreatePayloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecruitmentWave
        fields = ["name", "year", "announcementText"]


@api_view(["GET", "POST"])
@handle(
    only_authenticated=True,
    serializer_config={"BODY": CreatePayloadSerializer},
)
def view(request: RequestWithContext):
    method = request.method

    if method == "GET":
        waves = recruitment_wave_uc.get_list(request)
        response = serialize_unwrap({"waves": waves}, GetListResponse)
        return APIResponse(response)

    elif method == "POST":
        payload = request.ctx.store["BODY"]
        recruitment_wave = recruitment_wave_uc.create(
            request,
            name=payload["name"],
            year=payload["year"],
            announcement_text=payload["announcementText"],
        )

        response = serialize_unwrap(recruitment_wave, _recruitment_wave_serializer)

        return APIResponse(response)

    raise IllegalOperationException()
