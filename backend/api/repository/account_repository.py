# Model
from typing import NotRequired, Optional, TypedDict
from exception.application_logic.client.not_found import NotFoundException
from exception.application_logic.server.Illegal_operation import (
    IllegalOperationException,
)
from domain.models import Account, Student, Staff

from django.db.models import Model
from exception.base_stackable_exception import StackableException
from exception.unknown_exception import UnknownException


class EditAccountPayload(TypedDict):
    email: NotRequired[str]
    firstName: NotRequired[str]
    lastName: NotRequired[str]


class AccountRepository:

    @staticmethod
    def get_account_by_uid(uid: str) -> None | Account:
        try:
            account = Account.objects.get(uid=uid)
            return account
        except Account.DoesNotExist:
            return None
        except Exception as e:
            raise e

    @staticmethod
    def create(
        email: str,
        firstName: str,
        lastName: str,
        uid: Optional[str] = None,
    ):
        account = Account.objects.create(
            uid=uid,
            email=email,
            firstName=firstName,
            lastName=lastName,
        )
        account.save()

        return account

    @staticmethod
    def get_by_email(email: str) -> None | Account:
        try:
            account = Account.objects.get(email=email)
            return account
        except Account.DoesNotExist:
            return None
        except Exception as e:
            raise e

    """The user must not already have uid"""

    @staticmethod
    def assign_uid(account: Account, uid: str):
        if account.uid is not None:
            raise IllegalOperationException("Account already has a uid")
        account.uid = uid
        account.save()

    @staticmethod
    def edit_by_id(account_id: str, payload: EditAccountPayload) -> Account:
        try:
            account = Account.objects.get(id=account_id)
            for key, value in payload.items():
                setattr(account, key, value)
            account.save()
            return account
        except Account.DoesNotExist:
            raise NotFoundException("Account not found")
        except Exception as e:
            raise e
