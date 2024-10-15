from typing import List, TypedDict
from api.use_case.auth import auth_uc
from domain.models import Account
from interfaces.context import Context
from interfaces.request_with_context import RequestWithContext
from layer.use_case import usecase
from api.repository.account_repository import AccountRepository
from api.repository.student_repository import StudentRepository


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
