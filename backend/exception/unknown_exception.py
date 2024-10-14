from typing import Any

from .base_stackable_exception import StackableException


class UnknownException(StackableException):

    @property
    def error_code(self) -> str:
        return "UNKNOWN_EXCEPTION"
