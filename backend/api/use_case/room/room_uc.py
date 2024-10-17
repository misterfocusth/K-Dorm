
from typing import List, Optional, TypedDict
from api.repository.room_repository import RoomRepository
from domain.models import Room
from exception.application_logic.client.not_found import NotFoundException
from exception.unknown_exception import UnknownException
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


@usecase(
    only_authenticated=True,
)
def create(ctx: Context, floor: int, name: str, building_id: str):
    room = RoomRepository.create(floor, name, building_id)
    return room


class CreateRoomPayload(TypedDict):
    floor: int
    name: str
    building_id: str


@usecase(
    only_authenticated=True,
)
def createMany(ctx: Context, rooms: List[CreateRoomPayload]):

    new_rooms: List[Room] = []

    for room in rooms:
        print(room)
        new_room = RoomRepository.create(
            room["floor"], room["name"], room["building_id"]
        )
        new_rooms.append(new_room)

    return new_rooms


@usecase()
def get_by_id(ctx: Context, id: str):
    room = RoomRepository.get_by_id(id)
    return room


@usecase(only_authenticated=True)
def edit(
    ctx: Context,
    room_id: str,
    floor: Optional[int],
    name: Optional[str],
):
    room = RoomRepository.get_by_id(room_id)
    if room is None:
        raise UnknownException("Room not found")
    if floor is not None:
        room.floor = floor
    if name is not None:
        room.name = name
    room.save()
    return room


@usecase(only_authenticated=True)
def delete(ctx: Context, id: str):
    room = RoomRepository.delete(id)
    return room
