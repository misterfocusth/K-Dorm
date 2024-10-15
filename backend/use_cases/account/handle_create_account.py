# Django
from django.db import transaction

# Repositories
from api.repository.account import AccountRepository
from api.repository.staff_repository import StaffRepository
from api.repository.mainternance_staff_repository import (
    MaintenanceStaffRepository,
)
from api.repository.security_staff_repository import SecurityStaffRepository

# Utils
from utils.firebase_storage import get_bucket_location


@transaction.atomic
def handle_create_account(request, serializer):
    validated_data = serializer.validated_data

    account = AccountRepository.create_new_account(
        email=validated_data["email"],
        first_name=validated_data["firstName"],
        last_name=validated_data["lastName"],
    )

    if account is None:
        return None

    if validated_data["type"] == "STAFF":
        StaffRepository.create_new_staff_account(account=account)
    elif validated_data["type"] == "MAINTENANCE_STAFF":
        MaintenanceStaffRepository.create_new_maintenance_staff_account(account=account)
    elif validated_data["type"] == "SECURITY_STAFF":
        SecurityStaffRepository.create_new_security_staff_account(account=account)

    account.refresh_from_db()

    return account
