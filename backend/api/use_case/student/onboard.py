from backend.api.use_case.student import permission_checker
from backend.exception.auth.unauthenticated import UnauthenticatedException
from backend.exception.permission.unauthorized_action import UnauthorizedActionException
from backend.interfaces.context import Context
from backend.layer.use_case import usecase
from backend.repositories.student_repository import StudentRepository


@usecase()
def onboard(ctx: Context):

    if ctx.user is None:
        raise UnauthenticatedException("Not authenticated")

    if ctx.user.uid is None:
        raise UnauthenticatedException("Not signed in")

    student = StudentRepository.get_by_account_id(ctx.user.pk)
    if student is None:
        raise UnauthorizedActionException("Not a student")

    student = StudentRepository.edit_by_pk(pk=student.pk, payload={"isOnBoarded": True})

    return student
