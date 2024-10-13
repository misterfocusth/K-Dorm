from backend.exception.base_stackable_exception import StackableException


class ValidationException(StackableException):
    @property
    def error_code(self) -> str:
        return "VALIDATION_FAILED"

    @property
    def error_status(self) -> int:
        return 400
