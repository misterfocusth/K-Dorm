from exception.permission.base import PermissionDenied


class UnauthorizedAction(PermissionDenied):

    @property
    def error_code(self) -> str:
        return "UNAUTHORIZED_ACTION"
