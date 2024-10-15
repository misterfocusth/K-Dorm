from api.repository.student_repository import StudentRepository
from interfaces.context import Context
from layer.use_case import usecase


@usecase()
def is_student(ctx: Context, accountId: str) -> bool:
    student = StudentRepository.get_by_account_id(accountId)
    return bool(student)
