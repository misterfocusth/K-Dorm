from typing import NotRequired, TypedDict
from exception.application_logic.client.not_found import NotFoundException
from domain.models import Student


class EditStudentPayload(TypedDict):
    studentId: NotRequired[str]
    isOnBoarded: NotRequired[bool]


class StudentRepository:

    @staticmethod
    def create(studentId, account) -> Student:
        student = Student.objects.create(studentId=studentId, account=account)
        student.save()

        return student

    @staticmethod
    def get_by_account_id(account_id: str) -> Student | None:
        try:
            student = Student.objects.get(account_id=account_id)
        except Student.DoesNotExist:
            return None

        return student

    @staticmethod
    def get_by_account_uid(uid: str) -> Student | None:
        try:
            student = Student.objects.get(account__uid=uid)
        except Student.DoesNotExist:
            return None

        return student

    @staticmethod
    def get_by_pk(id: str) -> Student | None:
        try:
            student = Student.objects.get(id=id)
        except Student.DoesNotExist:
            return None

        return student

    @staticmethod
    def get_by_student_id(studentId: str) -> Student | None:
        try:
            student = Student.objects.get(studentId=studentId)
        except Student.DoesNotExist:
            return None

        return student

    @staticmethod
    def edit_by_pk(pk: str, payload: EditStudentPayload) -> Student:
        try:
            student = Student.objects.get(id=pk)
            studentId = payload.get("studentId")
            isOnBoarded = payload.get("isOnBoarded")
            if studentId is not None:
                student.studentId = studentId
            if isOnBoarded is not None:
                student.isOnBoarded = isOnBoarded
            student.save()
            return student
        except Student.DoesNotExist:
            raise NotFoundException("Edit target is not found")

    @staticmethod
    def edit_by_student_id(student_id: str, payload: EditStudentPayload) -> Student:
        try:
            student = StudentRepository.get_by_student_id(student_id)
            if student is None:
                raise NotFoundException("Edit target is not found")
            return StudentRepository.edit_by_pk(student.pk, payload)
        except Student.DoesNotExist:
            raise NotFoundException("Edit target is not found")
