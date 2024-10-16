from django.db import transaction

from api.repository.building_repository import BuildingRepository
from interfaces.context import Context
from interfaces.request_with_context import RequestWithContext
from layer.handle import handle
from layer.use_case import usecase


@usecase(only_authenticated=True)
def get_list(ctx: Context):
    buildings = BuildingRepository.get_all()
    return buildings


@usecase()
def get_by_id(ctx: Context, id: str):
    building = BuildingRepository.get_by_id(id)
    return building


@transaction.atomic
@usecase()
def create(ctx: Context, name: str):
    building = BuildingRepository.create(name)
    return building


@transaction.atomic
@usecase()
def edit(ctx: Context, id: str, name: str):
    building = BuildingRepository.get_by_id(id)
    if building is None:
        return None
    building.name = name
    building.save()
    return building


def delete(ctx: Context, id: str):
    building = BuildingRepository.get_by_id(id)
    if building is None:
        return None
    building.delete()
    return building
