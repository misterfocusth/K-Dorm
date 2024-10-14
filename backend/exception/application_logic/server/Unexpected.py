from exception.base_stackable_exception import StackableException


class UnexpectedException(StackableException):
    @property
    def error_code(self):
        return "UNEXPECTED_EXCEPTION"
