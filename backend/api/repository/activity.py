# Model
from typing import NotRequired, Optional, TypedDict
from exception.application_logic.client.not_found import NotFoundException
from exception.application_logic.server.Illegal_operation import (
    IllegalOperationException,
)
from domain.models import Activity, Student, Staff

from django.db.models import Model
from exception.base_stackable_exception import StackableException
from exception.unknown_exception import UnknownException
from api.repository.activity_category import ActivityCategoryRepository

import datetime


class ActivityRepository():
    @staticmethod
    def get_all() -> list[Activity]:
        try:
            activities = Activity.objects.all()
            return list(activities)
        except Exception as e:
            raise e

    @staticmethod
    def create(
        name: str,
        note: str,
        location: str,
        earnedVolunteerHours: float,
        categories,
        studentId: str
    ):
        print(categories)

        student = Student.objects.get(studentId=studentId)

        activity = Activity.objects.create(
            name=name,
            note=note,
            date=datetime.datetime.now(),
            location=location,
            earnedVolunteerHours=earnedVolunteerHours,
            student=student
        )

        for categoryId in categories:
            print(categoryId)
            category = ActivityCategoryRepository.get_by_id(categoryId)
            activity.categories.add(category)

        activity.save()

        return activity

    @staticmethod
    def get_by_id(activity_id: str):
        try:
            activity = Activity.objects.get(id=activity_id)
            return activity
        except Activity.DoesNotExist:
            raise NotFoundException("Activity not found")
        except Exception as e:
            raise e

    @staticmethod
    def get_by_student_id(student_id: str):
        try:
            student = Student.objects.get(studentId=student_id)

            activities = Activity.objects.filter(
                student=student).order_by('createdAt')
            return activities
        except Exception as e:
            raise e
