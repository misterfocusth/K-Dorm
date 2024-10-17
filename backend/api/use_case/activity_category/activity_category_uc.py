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


class EditActivityCategoryPayload(TypedDict):
    handle: NotRequired[str]
    name: NotRequired[str]
    visibleToStudents: NotRequired[bool]
    visibleToStaffs: NotRequired[bool]
    visibleToSecurityStaffs: NotRequired[bool]


class CreateActivityCategoryPayload(TypedDict):
    handle: str
    name: str
    visibleToStudents: bool
    visibleToStaffs: bool
    visibleToSecurityStaffs: bool


@usecase(only_authenticated=True)
def get_list(ctx: Context):
    activity_categories = ActivityCategoryRepository.get_all()
    return activity_categories


@usecase(
    only_authenticated=True,
)
def create(ctx: Context, payload: CreateActivityCategoryPayload):
    activity_category = ActivityCategoryRepository.create(
        payload["handle"],
        payload["name"],
        payload["visibleToStudents"],
        payload["visibleToStaffs"],
        payload["visibleToSecurityStaffs"],
    )
    return activity_category


@usecase(
    only_authenticated=True,
)
def edit_by_id(ctx: Context, activity_category_id: str, payload: EditActivityCategoryPayload):
    activity_category = ActivityCategoryRepository.edit_by_id(
        activity_category_id, payload)
    return activity_category


@usecase(
    only_authenticated=True,
)
def delete_by_id(ctx: Context, activity_category_id: str):
    activity_category = ActivityCategoryRepository.delete_by_id(
        activity_category_id)
    return activity_category
