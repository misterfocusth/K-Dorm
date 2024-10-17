from time import clock_getres
from typing import List, Optional, TypedDict
from api.repository.room_repository import RoomRepository
from domain.models import Room
from exception.application_logic.client.not_found import NotFoundException
from exception.unknown_exception import UnknownException
from interfaces.context import Context
from interfaces.request_with_context import RequestWithContext
from layer.handle import handle
from layer.use_case import usecase
from api.repository.activity_category import ActivityCategoryRepository
from typing import NotRequired, Optional, TypedDict
from api.repository.activity import ActivityRepository


class CreateActivityPayload(TypedDict):
    name: str
    note: str
    location: str
    earnedVolunteerHours: float
    studentId: str
    categories: List[int]


@usecase(only_authenticated=True)
def get_list(ctx: Context):
    activities = ActivityRepository.get_all()
    return activities


@usecase(only_authenticated=True)
def get_by_student_id(ctx: Context, student_id: str):
    activities = ActivityRepository.get_by_student_id(student_id)
    return activities


@usecase(only_authenticated=True)
def create(ctx: Context, payload: CreateActivityPayload):
    activity = ActivityRepository.create(
        payload["name"],
        payload["note"],
        payload["location"],
        payload["earnedVolunteerHours"],
        payload["categories"],
        payload["studentId"]
    )
    return activity
