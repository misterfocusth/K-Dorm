from domain.models import MaintenanceStaff, Account


class MaintenanceStaffRepository():
    @staticmethod
    def create_new_maintenance_staff_account(account: Account) -> MaintenanceStaff | None:
        maintenance_staff = MaintenanceStaff.objects.create(
            account=account
        )
        maintenance_staff.save()

        return maintenance_staff

    @staticmethod
    def get_maintenance_staff_account_by_id(id: int) -> MaintenanceStaff | None:
        maintenance_staff = MaintenanceStaff.objects.get(id=id)
        return maintenance_staff
