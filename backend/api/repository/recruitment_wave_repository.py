from typing import List, NotRequired, Optional, TypedDict
from domain.models import RecruitmentWave
from exception.application_logic.client.not_found import NotFoundException


class RecruitmentWaveRepository:

    @staticmethod
    def get_by_id(recruitment_wave_id: str) -> RecruitmentWave | None:
        try:
            recruitment = RecruitmentWave.objects.get(id=recruitment_wave_id)
            return recruitment
        except RecruitmentWave.DoesNotExist:
            return None

    @staticmethod
    def get_by_name(
        recruitment_wave_name: str,
    ) -> List[RecruitmentWave]:
        waves = RecruitmentWave.objects.filter(name=recruitment_wave_name).all()
        return list(waves)

    @staticmethod
    def get_by_year(
        recruitment_wave_year: int,
    ) -> List[RecruitmentWave]:
        waves = RecruitmentWave.objects.filter(year=recruitment_wave_year).all()
        return list(waves)

    @staticmethod
    def get_all() -> List[RecruitmentWave]:
        waves = RecruitmentWave.objects.all()
        return list(waves)

    class CreateRecruitmentWavePayload(TypedDict):
        name: str
        year: int
        announcementText: Optional[str]

    @staticmethod
    def create(
        recruitmentWave: CreateRecruitmentWavePayload,
    ) -> RecruitmentWave:

        wave = RecruitmentWave(
            name=recruitmentWave["name"],
            year=recruitmentWave["year"],
            announcementText=recruitmentWave["announcementText"],
        )

        wave.save()
        return wave

    class EditRecruitmentWavePayload(TypedDict):
        name: NotRequired[str]
        year: NotRequired[int]
        announcementText: NotRequired[str]

    @staticmethod
    def update(id: str, payload: EditRecruitmentWavePayload) -> RecruitmentWave:
        recruitment_wave = RecruitmentWave.objects.get(id=id)
        if not recruitment_wave:
            raise NotFoundException("Recruitment wave not found")

        if "name" in payload:
            recruitment_wave.name = payload["name"]
        if "year" in payload:
            recruitment_wave.year = payload["year"]
        if "announcementText" in payload:
            recruitment_wave.announcementText = payload["announcementText"]

        recruitment_wave.save()

        return recruitment_wave

    @staticmethod
    def delete(id: str):
        recruitment_wave = RecruitmentWave.objects.get(id=id)
        if not recruitment_wave:
            raise NotFoundException("Recruitment wave not found")

        recruitment_wave.delete()
        return recruitment_wave
