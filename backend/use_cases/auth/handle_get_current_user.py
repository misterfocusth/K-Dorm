# Exceptions
from rest_framework.exceptions import AuthenticationFailed

# Firebase
from firebase_admin import auth

# Utils
import utils.token as token_utils

# Repository
import repositories.account_repository as account_repository


def handle_get_current_user(request):
    session_token = token_utils.get_session_id_token(request)
    decoded_token = auth.verify_id_token(
        session_token, clock_skew_seconds=30)
    uid = decoded_token['uid']

    account = account_repository.get_account_by_uid(uid)

    if account is None:
        raise AuthenticationFailed("User not found")

    return account
