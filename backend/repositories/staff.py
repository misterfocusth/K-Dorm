from domain.models import Staff


class StaffRepository:

    @staticmethod
    def create_new_staff_account(account):
        staff = Staff.objects.create(account=account)
        staff.save()

        return staff
