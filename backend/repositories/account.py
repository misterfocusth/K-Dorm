# Model
from domain.models import Account, Student, Staff

from django.db.models import Model
from exception.base_stackable_exception import StackableException
from exception.unknown_exception import UnknownException


class AccountRepository:

    @staticmethod
    def get_account_by_uid(uid: str) -> None | Account:
        try:
            account = Account.objects.get(uid=uid)
            return account
        except Model.DoesNotExist:
            return None
        except Exception as e:
            raise e

    @staticmethod
    def create_new_account(uid: str, email: str, first_name: str, last_name: str):
        account = Account.objects.create(
            uid=uid,
            email=email,
            firstName=first_name,
            lastName=last_name,
        )
        account.save()

        return account
