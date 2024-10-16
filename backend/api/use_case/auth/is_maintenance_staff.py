from backend.api.repository import maintenance_repository
from backend.api.repository.maintenance_staff_repository import (
    MaintenanceStaffRepository,
)
from backend.interfaces.context import Context
from backend.layer.use_case import usecase


@usecase()
def is_maintenance_staff(ctx: Context, accountId: str):
    maintenanceStaff = MaintenanceStaffRepository.get_by_account_id(accountId)
    return bool(maintenanceStaff)
