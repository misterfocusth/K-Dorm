from typing import NotRequired, Optional, TypedDict
from api.repository.recruitment_wave_repository import RecruitmentWaveRepository
from domain.models import RecruitmentWave
from exception.application_logic.client.not_found import NotFoundException
from interfaces.context import Context
from layer.use_case import usecase


@usecase(only_authenticated=True)
def get_by_id(ctx: Context, id: str):
    wave = RecruitmentWaveRepository.get_by_id(id)
    if not wave:
        raise NotFoundException("Recruitment wave not found")
    return wave


@usecase(only_authenticated=True)
def get_list(ctx: Context):
    waves = RecruitmentWaveRepository.get_all()
    return waves


@usecase(only_authenticated=True)
def get_by_name(ctx: Context, name: str):
    waves = RecruitmentWaveRepository.get_by_name(name)
    return waves


@usecase(only_authenticated=True)
def get_by_year(ctx: Context, year: int):
    waves = RecruitmentWaveRepository.get_by_year(year)
    return waves


@usecase(only_authenticated=True)
def create(ctx: Context, name: str, year: int, announcement_text: Optional[str] = None):
    wave = RecruitmentWaveRepository.create(
        {"name": name, "year": year, "announcementText": announcement_text}
    )
    return wave


class EditRecruitmentWave(TypedDict):
    name: NotRequired[str]
    year: NotRequired[int]
    announcementText: NotRequired[str]


@usecase(only_authenticated=True)
def edit(ctx: Context, id: str, data: EditRecruitmentWave):
    wave = RecruitmentWaveRepository.update(id, data)
    return wave


@usecase(only_authenticated=True)
def delete(ctx: Context, id: str):
    wave = RecruitmentWaveRepository.delete(id)
    return wave
