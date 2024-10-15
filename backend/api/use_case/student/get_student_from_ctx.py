from backend.domain.models import Account
from backend.interfaces.context import Context
from backend.interfaces.request_with_context import RequestWithContext
from backend.layer.use_case import usecase


@usecase()
def get_student_from_ctx(ctx: Context) -> Account:

    if not ctx.user:
        raise Exception("User not found in context")

    return ctx.user
