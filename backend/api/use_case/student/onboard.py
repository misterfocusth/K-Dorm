from api.use_case import permission_checker
from exception.auth.unauthenticated import UnauthenticatedException
from exception.permission.unauthorized_action import UnauthorizedActionException
from interfaces.context import Context
from layer.use_case import usecase
from api.repository.student_repository import StudentRepository


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
