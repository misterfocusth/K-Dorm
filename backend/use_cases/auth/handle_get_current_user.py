# Exceptions
from rest_framework.exceptions import AuthenticationFailed

# Firebase
from firebase_admin import auth

# Utils
from utils.token import get_session_id_token

# Repository
from repositories.account_repository import get_account_by_uid


def handle_get_current_user(request):
    session_token = get_session_id_token(request)
    decoded_token = auth.verify_id_token(
        session_token, clock_skew_seconds=30)
    uid = decoded_token['uid']

    account = get_account_by_uid(uid)

    if account is None:
        raise AuthenticationFailed("User not found")

    return account
