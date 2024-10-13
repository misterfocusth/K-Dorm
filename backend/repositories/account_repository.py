# Model
from domain.models import Account, Student, Staff, MaintenanceStaff, SecurityStaff


def get_account_by_uid(uid):
    account = Account.objects.filter(uid=uid).first()
    return account


def get_account_by_id(id):
    account = Account.objects.get(id=id)
    return account


def create_new_account(uid, email, first_name, last_name):
    account = Account.objects.create(
        uid=uid,
        email=email,
        firstName=first_name,
        lastName=last_name,
    )
    account.save()

    return account


def create_new_student_account(student_id, account):
    student = Student.objects.create(
        studentId=student_id,
        account=account
    )
    student.save()

    return student


def create_new_staff_account(account):
    staff = Staff.objects.create(
        account=account
    )
    staff.save()

    return staff


def create_new_maintenance_staff_account(account):
    maintenance_staff = MaintenanceStaff.objects.create(
        account=account
    )
    maintenance_staff.save()

    return maintenance_staff


def create_new_security_staff_account(account):
    security_staff = SecurityStaff.objects.create(
        account=account
    )
    security_staff.save()

    return security_staff


def get_all_staff_accounts():
    staff_accounts = Account.objects.filter(student__isnull=True).all()
    return staff_accounts
