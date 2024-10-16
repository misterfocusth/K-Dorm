from datetime import datetime, timedelta
from typing import List
from api.repository.residence_repository import ResidenceRepository
from domain.models import Residence
from interfaces.context import Context
from layer.use_case import usecase


@usecase(only_authenticated=True)
def get_current_by_room_id(ctx: Context, room_id: str):
    today = datetime.now()
    tomorrow = datetime.now() + timedelta(days=1)

    residences = ResidenceRepository.get_complete_overlap(
        start_date=today, end_date=tomorrow
    )

    _residences: List[Residence] = []
    for residence in residences:
        if residence.room.id == room_id:  # type: ignore
            _residences.append(residence)

    return _residences
