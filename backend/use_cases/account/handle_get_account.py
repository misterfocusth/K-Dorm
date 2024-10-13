from repositories.account_repository import get_all_staff_accounts


def handle_get_all_staff_accounts(request):
    staff_accounts = get_all_staff_accounts()
    return staff_accounts
