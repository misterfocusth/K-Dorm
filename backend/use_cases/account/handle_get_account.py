from api.repository.account import AccountRepository


def handle_get_all_staff_accounts(request):
    staff_accounts = AccountRepository.get_all_staff_accounts()
    return staff_accounts
