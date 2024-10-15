from api.use_case.auth import signin
from api.use_case.auth.create_account import create_account as _create_account
from .is_staff import is_staff as _is_staff
from .is_student import is_student as _is_student
from .signin import signin as _signin

is_staff = _is_staff
is_student = _is_student
signin = _signin
create_account = _create_account
