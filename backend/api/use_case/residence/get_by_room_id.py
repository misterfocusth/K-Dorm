from api.repository.residence_repository import ResidenceRepository
from layer.use_case import usecase


@usecase(only_authenticated=True)
def get_by_room_id(request, room_id: str):
    residences = ResidenceRepository.get_by_room_id(room_id=room_id)

    return residences
