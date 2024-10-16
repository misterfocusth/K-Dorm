from api.repository.room_repository import RoomRepository
from interfaces.context import Context
from interfaces.request_with_context import RequestWithContext
from layer.handle import handle
from layer.use_case import usecase


@usecase(only_authenticated=True)
def get_list(ctx: Context):
    rooms = RoomRepository.get_all()
    return rooms


@usecase(
    only_authenticated=True,
)
def get_by_building_id(ctx: Context, building_id: str):
    rooms = RoomRepository.get_by_building_id(building_id)
    return rooms


def create(ctx: Context, floor: int, name: str, building_id: str):
    room = RoomRepository.get_unique(floor, name)
    if room is not None:
        return None
    room = RoomRepository.create(floor, name, building_id)
    return room


def edit(ctx: Context, id: str, floor: int, name: str):
    room = RoomRepository.get_by_id(id)
    if room is None:
        return None
    room.floor = floor
    room.name = name
    room.save()
    return room
