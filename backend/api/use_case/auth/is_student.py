from interfaces.context import Context
from layer.use_case import usecase
from api.repository.student import StudentRepository


@usecase()
def is_student(ctx: Context, accountId: str) -> bool:
    student = StudentRepository.get_student_by_uid(accountId)
    return bool(student)
