# Exceptions
from rest_framework.request import Request
from rest_framework.exceptions import AuthenticationFailed
from interfaces.context import Context

# Firebase
from firebase_admin import auth

# Utils
from utils.token import get_session_id_token

# Repository


def get_user_from_session_token(ctx: Context, request: Request):

    session_id_token_cookie = request.COOKIES.get("session_id_token")
    session_id_token_auth_header = request.headers.get("Authorization")

    token: str | None = None

    if session_id_token_auth_header:
        token = session_id_token_auth_header.split(" ")[1]
    elif session_id_token_cookie:
        token = session_id_token_cookie
    else:
        raise AuthenticationFailed("session_id_token not found")

    session_token = get_session_id_token(ctx.request)
    decoded_token = auth.verify_id_token(session_token, clock_skew_seconds=30)
    uid = decoded_token["uid"]

    account = get_account_by_uid(uid)

    if account is None:
        raise AuthenticationFailed("User not found")

    return account


def handle_get_current_user(request):
    session_token = get_session_id_token(request)
    decoded_token = auth.verify_id_token(session_token, clock_skew_seconds=30)
    uid = decoded_token["uid"]

    account = get_account_by_uid(uid)

    if account is None:
        raise AuthenticationFailed("User not found")

    return account
