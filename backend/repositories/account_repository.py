# Model
from domain.models import Account, Student, Staff


def get_account_by_uid(uid):
    account = Account.objects.get(uid=uid)
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
        student_id=student_id,
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
