from exception.base_stackable_exception import StackableException


class ConfigurationFailure(StackableException):
    @property
    def error_code(self) -> str:
        return "CONFIGURATION_FAILURE"

    @property
    def error_status(self) -> int:
        return 500
