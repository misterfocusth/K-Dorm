from typing import Dict, Optional
from rest_framework.response import Response

from backend.exception.base_stackable_exception import StackableException


class ErrorResponse(Response):
    def __init__(
        self,
        message: str | Dict,
        error: str,
        data=None,
        status: Optional[int] = None,
        **kwargs
    ):
        # if data is None:
        #     data = {}

        response_data = {"error": error, "message": message}

        super().__init__(data=response_data, status=status, **kwargs)

    @staticmethod
    def fromException(exception: StackableException):
        return ErrorResponse(
            message=exception.message,
            status=exception.error_status,
            error=exception.error_code,
        )
