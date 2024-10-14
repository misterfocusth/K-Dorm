from rest_framework.request import Request
from rest_framework.exceptions import AuthenticationFailed


# TODO: To be migrated to middleware folder
def get_session_id_token(request: Request):
    session_id_token_cookie = request.COOKIES.get("session_id_token")
    session_id_token_auth_header = request.headers.get("Authorization")

    if session_id_token_auth_header:
        token = session_id_token_auth_header.split(" ")[1]
        return token
    elif session_id_token_cookie:
        return session_id_token_cookie
    else:
        raise AuthenticationFailed("session_id_token not found")
