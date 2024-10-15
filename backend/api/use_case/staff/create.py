# Django
from django.db import transaction

# Repositories
from api.repository.account import AccountRepository
from api.repository.staff_repository import StaffRepository
from api.repository.security_staff_repository import SecurityStaffRepository

# Utils
from api.repository.maintenance_staff_repository import (
    MaintenanceStaffRepository,
)
from utils.firebase_storage import get_bucket_location


@transaction.atomic
def create(request, serializer):
    validated_data = serializer.validated_data

    account = AccountRepository.create(
        email=validated_data["email"],
        first_name=validated_data["firstName"],
        last_name=validated_data["lastName"],
    )

    if account is None:
        return None

    if validated_data["type"] == "STAFF":
        StaffRepository.create_new_staff_account(account=account)
    elif validated_data["type"] == "MAINTENANCE_STAFF":
        MaintenanceStaffRepository.create(account=account)
    elif validated_data["type"] == "SECURITY_STAFF":
        SecurityStaffRepository.create_new_security_staff_account(account=account)

    account.refresh_from_db()

    return account
