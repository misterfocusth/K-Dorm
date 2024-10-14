from exception.base_stackable_exception import StackableException


class InvalidRequestException(StackableException):

    @property
    def error_code(self) -> str:
        return "INVALID_REQUEST"
