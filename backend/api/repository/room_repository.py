from typing import NotRequired, Optional
from domain.models import Room


class RoomRepository:
    @staticmethod
    def get_by_id(id: str) -> Room | None:
        try:
            room = Room.objects.get(id=id)
            return room
        except Room.DoesNotExist:
            return None

    @staticmethod
    def get_unique(floor: int, name: str) -> Room | None:
        try:
            room = Room.objects.get(floor=floor, name=name)
            return room
        except Room.DoesNotExist:
            return None

    @staticmethod
    def get_all() -> list[Room]:
        rooms = Room.objects.all()
        return list(rooms)

    @staticmethod
    def get_by_building_id(building_id: str) -> list[Room]:
        rooms = Room.objects.filter(building_id=building_id)
        return list(rooms)

    @staticmethod
    def create(floor: int, name: str, building_id: str) -> Room:
        print(building_id)
        room = Room.objects.create(floor=floor, name=name, building_id=building_id)
        print(room)
        room.save()
        return room

    @staticmethod
    def edit(
        id: str, floor: Optional[int] = None, name: Optional[str] = None
    ) -> Room | None:
        room = Room.objects.get(id=id)
        if room is None:
            return None

        if floor is not None:
            room.floor = floor

        if name is not None:
            room.name = name

        room.save()
        return room

    @staticmethod
    def delete(id: str):
        room = Room.objects.get(id=id)
        if room is None:
            return None

        room.delete()
        return room
