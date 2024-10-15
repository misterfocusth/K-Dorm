from exception.base_stackable_exception import StackableException


class AuthenticationFailure(StackableException):
    @property
    def error_code(self) -> str:
        return "AUTHENTICATION_FAILURE"

    @property
    def error_status(self) -> int:
        return 401
