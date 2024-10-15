from domain.models import Account
from interfaces.context import Context
from interfaces.request_with_context import RequestWithContext
from layer.use_case import usecase


@usecase()
def get_student_from_ctx(ctx: Context) -> Account:

    if not ctx.user:
        raise Exception("User not found in context")

    return ctx.user
