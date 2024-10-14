from backend.interfaces.context import Context
from backend.layer.use_case import usecase
from backend.repositories.staff import StaffRepository


@usecase()
def is_staff(ctx: Context, accountId: str):
    staff = StaffRepository.get_staff_by_account_id(accountId)
    return bool(staff)
