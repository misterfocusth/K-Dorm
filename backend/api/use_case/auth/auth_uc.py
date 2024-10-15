from interfaces.request_with_context import RequestWithContext
from api.use_case.auth import signin
from .is_staff import is_staff as _is_staff
from .is_student import is_student as _is_student
from .signin import signin as _signin

is_staff = _is_staff
is_student = _is_student
signin = _signin


class AuthUseCase:
    @staticmethod
    def signin(request: RequestWithContext, serializer):
