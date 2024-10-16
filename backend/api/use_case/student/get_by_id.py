from api.repository.student_repository import StudentRepository
from domain.models import Student
from exception.application_logic.client.not_found import NotFoundException
from interfaces.context import Context
from layer.use_case import usecase


@usecase(only_authenticated=True)
def get_by_id(ctx: Context, student_id: str) -> Student:
    student = StudentRepository.get_by_student_id(student_id)
    if student is None:
        raise NotFoundException("Student not found")
    return student
