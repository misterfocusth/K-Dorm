from domain.models import SecurityStaff, Account


class SecurityStaffRepository():
    @staticmethod
    def create_new_security_staff_account(account: Account) -> SecurityStaff | None:
        security_staff = SecurityStaff.objects.create(
            account=account
        )
        security_staff.save()

        return security_staff
