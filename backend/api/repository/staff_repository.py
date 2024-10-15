from typing import List
from domain.models import Account, Staff


class StaffRepository:

    @staticmethod
    def create_new_staff_account(account) -> Account:
        staff = Staff.objects.create(account=account)
        staff.save()

        return staff.account

    @staticmethod
    def get_staff_by_account_id(account_id: str) -> Account | None:
        try:
            staff = Staff.objects.get(account__id=account_id)
        except Staff.DoesNotExist:
            return None

        return staff.account

    @staticmethod
    def get_staff_by_uid(uid: str) -> Account | None:
        try:
            staff = Staff.objects.get(account__uid=uid)
        except Staff.DoesNotExist:
            return None

        return staff.account

    @staticmethod
    def get_all_staff_accounts() -> List[Account]:
        staff_accounts = Account.objects.filter(student__isnull=True).all()
        return list(staff_accounts)
