# Model
from domain.models import Account, Student, Staff, MaintenanceStaff, SecurityStaff


class AccountRepository():
    @staticmethod
    def get_account_by_uid(uid: str) -> Account | None:
        account = Account.objects.filter(uid=uid).first()
        return account

    @staticmethod
    def get_account_by_id(id: int) -> Account | None:
        account = Account.objects.get(id=id)
        return account

    @staticmethod
    def create_new_account(email: str, first_name: str, last_name: str) -> Account | None:
        account = Account.objects.create(
            email=email,
            firstName=first_name,
            lastName=last_name,
        )
        account.save()

        return account

    @staticmethod
    def create_new_student_account(student_id: str, account: Account) -> Student | None:
        student = Student.objects.create(
            studentId=student_id,
            account=account
        )
        student.save()

        return student

    @staticmethod
    def create_new_staff_account(account: Account) -> Staff | None:
        staff = Staff.objects.create(
            account=account
        )
        staff.save()

        return staff

    @staticmethod
    def create_new_maintenance_staff_account(account: Account) -> MaintenanceStaff | None:
        maintenance_staff = MaintenanceStaff.objects.create(
            account=account
        )
        maintenance_staff.save()

        return maintenance_staff

    @staticmethod
    def create_new_security_staff_account(account: Account) -> SecurityStaff | None:
        security_staff = SecurityStaff.objects.create(
            account=account
        )
        security_staff.save()

        return security_staff

    @staticmethod
    def get_all_staff_accounts():
        staff_accounts = Account.objects.filter(student__isnull=True).all()
        return staff_accounts

    @staticmethod
    def get_maintenance_staff_account_by_id(id: int) -> MaintenanceStaff | None:
        maintenance_staff = MaintenanceStaff.objects.get(id=id)
        return maintenance_staff
