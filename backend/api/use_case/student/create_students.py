from typing import List, TypedDict
from backend.api.use_case.auth import auth_uc
from backend.domain.models import Account
from backend.interfaces.context import Context
from backend.interfaces.request_with_context import RequestWithContext
from backend.layer.use_case import usecase
from backend.repositories.account_repository import AccountRepository
from backend.repositories.student_repository import StudentRepository


class Payload(TypedDict):
    email: str
    firstName: str
    lastName: str

    studentId: str


@usecase()
def create_students(ctx: Context, payloads: List[Payload]) -> List[Account]:

    accounts = []

    for payload in payloads:
        account = AccountRepository.create(
            email=payload["email"],
            firstName=payload["firstName"],
            lastName=payload["lastName"],
        )

        student = StudentRepository.create(
            studentId=payload["studentId"], account=account
        )

        accounts.append(account)

    return accounts
