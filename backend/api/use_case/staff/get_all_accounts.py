from backend.api.repository.staff_repository import StaffRepository
from backend.layer.use_case import usecase


@usecase(only_authenticated=True)
def get_all_accounts(request):
    staff_accounts = StaffRepository.get_all_staff_accounts()
    return staff_accounts
