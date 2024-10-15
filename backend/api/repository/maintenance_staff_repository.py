from domain.models import MaintenanceStaff, Account


class MaintenanceStaffRepository:
    @staticmethod
    def create(
        account: Account,
    ) -> MaintenanceStaff | None:
        maintenance_staff = MaintenanceStaff.objects.create(account=account)
        maintenance_staff.save()

        return maintenance_staff

    @staticmethod
    def get_by_id(id: int) -> MaintenanceStaff | None:
        try:

            maintenance_staff = MaintenanceStaff.objects.get(id=id)
            return maintenance_staff
        except MaintenanceStaff.DoesNotExist:
            return None

    @staticmethod
    def get_by_account_id(account_id: str) -> MaintenanceStaff | None:
        try:
            maintenance_staff = MaintenanceStaff.objects.get(account__id=account_id)
            return maintenance_staff
        except MaintenanceStaff.DoesNotExist:
            return None

    @staticmethod
    def get_by_account_uid(account_uid: str) -> MaintenanceStaff | None:
        try:
            maintenance_staff = MaintenanceStaff.objects.get(account__uid=account_uid)
            return maintenance_staff
        except MaintenanceStaff.DoesNotExist:
            return None
