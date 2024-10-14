from domain.models import Staff


class StaffRepository:

    @staticmethod
    def create_new_staff_account(account):
        staff = Staff.objects.create(account=account)
        staff.save()

        return staff

    @staticmethod
    def get_staff_by_account_id(account_id: str) -> Staff | None:
        try:
            staff = Staff.objects.get(account__id=account_id)
        except Staff.DoesNotExist:
            return None

        return staff

    @staticmethod
    def get_staff_by_uid(uid: str) -> Staff | None:
        try:
            staff = Staff.objects.get(account__uid=uid)
        except Staff.DoesNotExist:
            return None

        return staff
