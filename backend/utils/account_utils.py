from utils.token import get_session_id_token
from firebase_admin import auth
from api.repository.account import AccountRepository


def get_user_role(user_data):
    role = ""

    if user_data['student'] is not None:
        role = "STUDENT"
    if user_data['staff'] is not None:
        role = "STAFF"
    if user_data['maintenanceStaff'] is not None:
        role = "MAINTENANCE_STAFF"
    if user_data['securityStaff'] is not None:
        role = "SECURITY_STAFF"

    return role


def get_account_from_session(request):
    session_token = get_session_id_token(request)

    decoded_token = auth.verify_id_token(
        session_token, clock_skew_seconds=30)
    uid = decoded_token['uid']

    user = auth.get_user(uid)

    account = AccountRepository.get_account_by_uid(uid)

    return account
