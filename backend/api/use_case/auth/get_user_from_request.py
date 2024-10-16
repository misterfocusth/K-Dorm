from rest_framework.request import Request
from exception.auth.base import AuthenticationFailure
from layer.use_case import usecase
from api.repository.account import AccountRepository
from interfaces.context import Context

# Firebase
from firebase_admin import auth
from firebase_admin.auth import InvalidIdTokenError

# Utils
from utils.token import get_session_id_token


""""""


@usecase()
def get_user_from_request(ctx: Context, request: Request):

    session_id_token_cookie = request.COOKIES.get("session_id_token")
    session_id_token_auth_header = request.headers.get("Authorization")

    token: str | None = None

    try:

        if session_id_token_auth_header:
            token = session_id_token_auth_header.split(" ")[1]
        elif session_id_token_cookie:
            token = session_id_token_cookie
        else:
            raise AuthenticationFailure("session_id_token not found")

        decoded_token = auth.verify_id_token(token, clock_skew_seconds=30)
        uid = decoded_token["uid"]

        account = AccountRepository.get_account_by_uid(uid)
        if account is None:
            raise AuthenticationFailure("User not found")

        return account

    except IndexError:
        raise AuthenticationFailure("Invalid session token format")

    except InvalidIdTokenError:
        raise AuthenticationFailure("Invalid session token")

    except Exception as e:
        raise AuthenticationFailure(str(e))
