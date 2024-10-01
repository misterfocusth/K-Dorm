from rest_framework.exceptions import AuthenticationFailed


def get_session_id_token(request):
    # Access the cookie named 'session_id_token'
    session_id_token = request.COOKIES.get('session_id_token')

    if session_id_token:
        return session_id_token
    else:
        raise AuthenticationFailed('session_id_token not found')
