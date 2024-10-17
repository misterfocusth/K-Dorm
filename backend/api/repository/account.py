# Model
from domain.models import Account, Student, Staff

from django.db.models import Model
from exception.base_stackable_exception import StackableException
from exception.unknown_exception import UnknownException


class AccountRepository:
    @staticmethod
    def get_account_by_uid(uid: str) -> Account | None:
        account = Account.objects.filter(uid=uid).first()
        return account

    @staticmethod
    def get_account_by_id(id: int) -> Account | None:
        account = Account.objects.get(id=id)
        return account

    @staticmethod
    def create(email: str, first_name: str, last_name: str) -> Account | None:
        account = Account.objects.create(
            email=email,
            firstName=first_name,
            lastName=last_name,
        )
        account.save()

        return account

    @staticmethod
    def create_new_staff_account(account: Account) -> Staff | None:
        staff = Staff.objects.create(account=account)
        staff.save()

        return staff

    @staticmethod
    def get_all_staff_accounts():
        staff_accounts = Account.objects.filter(staff__isnull=True).all()
        return staff_accounts

    @staticmethod
    def get_all_student_accounts():
        student_accounts = Account.objects.filter(student__isnull=False).all()
        return student_accounts

    @staticmethod
    def get_account_by_email(email: str) -> Account | None:
        account = Account.objects.filter(email=email).first()
        return account

    @staticmethod
    def delete_account_by_id(id: int) -> Account | None:
        account = Account.objects.get(id=id)
        account.delete()
        return account
