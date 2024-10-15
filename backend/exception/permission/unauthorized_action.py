from exception.permission.base import PermissionDenied


class UnauthorizedActionException(PermissionDenied):

    @property
    def error_code(self) -> str:
        return "UNAUTHORIZED_ACTION"
