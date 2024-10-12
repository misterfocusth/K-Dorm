from backend.exception.permission.base import PermissionDenied


class UnauthorizedAction(PermissionDenied):
    pass
