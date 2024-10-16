from domain.models import Building
from exception.application_logic.client.not_found import NotFoundException


class BuildingRepository:

    @staticmethod
    def get_by_id(id: str) -> Building | None:
        try:
            building = Building.objects.get(id=id)
            return building
        except Building.DoesNotExist:
            return None

    @staticmethod
    def get_by_name(name: str) -> Building | None:
        try:
            building = Building.objects.get(name=name)
            return building
        except Building.DoesNotExist:
            return None

    @staticmethod
    def get_all() -> list[Building]:
        buildings = Building.objects.all()
        return list(buildings)

    @staticmethod
    def create(name: str) -> Building:
        building = Building.objects.create(name=name)
        building.save()
        return building

    @staticmethod
    def edit(id: str, name: str) -> Building | None:
        building = Building.objects.get(id=id)
        if building is None:
            raise NotFoundException("Building not found")

        building.name = name
        building.save()
        return building

    @staticmethod
    def delete(id: str):
        building = Building.objects.get(id=id)
        if building is None:
            raise NotFoundException("Building not found")

        building.delete()
        return building
