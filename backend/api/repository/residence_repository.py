from django.db.models.manager import BaseManager
from typing import List, NotRequired, TypedDict, Unpack
from backend.domain.models import RentBilling, Residence
from datetime import datetime as DateTime


class ResidenceQuery(TypedDict):

    isEvicted: NotRequired[bool]
    """
    Only check if current time is between start and end date
    If the residence is evicted, it WILL still be considered active
    """
    isActive: NotRequired[bool]

    startDateFrom: NotRequired[DateTime]
    startDateTo: NotRequired[DateTime]
    endDateFrom: NotRequired[DateTime]
    endDateTo: NotRequired[DateTime]

    student_pk: NotRequired[int]
    room_id: NotRequired[str]

    recruitment_wave_id: NotRequired[str]


def get_list(**filter: Unpack[ResidenceQuery]) -> List[Residence]:
    query = Residence.objects

    if filter.get("student_id"):
        query = query.filter(student_id=filter.get("student_id"))
    if filter.get("room_id"):
        query = query.filter(room_id=filter.get("room_id"))
    if filter.get("recruitment_wave_id"):
        query = query.filter(recruitment_wave_id=filter.get("recruitment_wave_id"))

    if filter.get("startDateFrom"):
        query = query.filter(startDate__gte=filter.get("startDateFrom"))
    if filter.get("startDateTo"):
        query = query.filter(startDate__lte=filter.get("startDateTo"))

    if filter.get("endDateFrom"):
        query = query.filter(endDate__gte=filter.get("endDateFrom"))
    if filter.get("endDateTo"):
        query = query.filter(endDate__lte=filter.get("endDateTo"))

    if filter.get("isEvicted") is not None:
        query = query.filter(isEvicted=filter.get("isEvicted"))

    if filter.get("isActive") is not None:
        query = query.filter(startDate__lte=DateTime.now()).filter(
            endDate__gte=DateTime.now()
        )

    return list(query.all())


def get_by_id(
    residence_id: str,
) -> Residence:
    return Residence.objects.get(id=residence_id)
