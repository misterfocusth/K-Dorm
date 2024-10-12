from backend.exception.permission.base import PermissionDenied
from backend.exception.base_stackable_exception import StackableException


class UnauthorizedAction(PermissionDenied):
    pass
