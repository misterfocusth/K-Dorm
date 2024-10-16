from exception.base_stackable_exception import StackableException


class ValidationException(StackableException):
    @property
    def error_code(self) -> str:
        return "PAYLOAD_VALIDATION_FAILED"

    @property
    def error_status(self) -> int:
        return 400
