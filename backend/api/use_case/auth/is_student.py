from backend.interfaces.context import Context
from backend.layer.use_case import usecase
from backend.repositories.student import StudentRepository


@usecase()
def is_student(ctx: Context, accountId: str) -> bool:
    student = StudentRepository.get_student_by_account_id(accountId)
    return bool(student)
