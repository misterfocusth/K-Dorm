# Model
from typing import NotRequired, Optional, TypedDict
from exception.application_logic.client.not_found import NotFoundException
from exception.application_logic.server.Illegal_operation import (
    IllegalOperationException,
)
from domain.models import ActivityCategory, Student, Staff

from django.db.models import Model
from exception.base_stackable_exception import StackableException
from exception.unknown_exception import UnknownException


class CreateActivityCategoryPayload(TypedDict):
    handle: str
    name: str
    visibleToStudents: bool
    visibleToStaffs: bool
    visibleToSecurityStaffs: bool


class EditActivityCategoryPayload(TypedDict):
    handle: NotRequired[str]
    name: NotRequired[str]
    visibleToStudents: NotRequired[bool]
    visibleToStaffs: NotRequired[bool]
    visibleToSecurityStaffs: NotRequired[bool]


class ActivityCategoryRepository:

    @staticmethod
    def get_all() -> list[ActivityCategory]:
        try:
            activity_categories = ActivityCategory.objects.all()
            return list(activity_categories)
        except Exception as e:
            raise e

    @staticmethod
    def create(
        handle: str,
        name: str,
        visibleToStudents: bool,
        visibleToStaffs: bool,
        visibleToSecurityStaffs: bool,
    ):
        activity_category = ActivityCategory.objects.create(
            handle=handle,
            name=name,
            visibleToStudents=visibleToStudents,
            visibleToStaffs=visibleToStaffs,
            visibleToSecurityStaffs=visibleToSecurityStaffs,
        )
        activity_category.save()

        return activity_category

    @staticmethod
    def edit_by_id(
        activity_category_id: str,
        payload: EditActivityCategoryPayload
    ) -> ActivityCategory:
        try:
            activity_category = ActivityCategory.objects.get(
                id=activity_category_id)

            for key, value in payload.items():
                if value is not None:
                    setattr(activity_category, key, value)

            activity_category.save()

            return activity_category
        except ActivityCategory.DoesNotExist:
            raise NotFoundException("ActivityCategory not found")
        except Exception as e:
            raise e

    @staticmethod
    def delete_by_id(activity_category_id: str):
        try:
            activity_category = ActivityCategory.objects.get(
                id=activity_category_id)
            activity_category.delete()
        except ActivityCategory.DoesNotExist:
            raise NotFoundException("ActivityCategory not found")
        except Exception as e:
            raise e
