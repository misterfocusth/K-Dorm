import math
from datetime import datetime as DateTime
from typing import List, Callable, NotRequired, Optional, ParamSpec, TypeVar, TypedDict

from django.utils import timezone

from domain.models import BaseBillingModel, RentBilling

P = ParamSpec("P")
R = TypeVar("R", bound=BaseBillingModel)


def _calculate_fine_cost(bill: R) -> R:
    if not bill.deadline:
        return bill
    if bill.isPaid and bill.paidDate:
        date_left = bill.deadline - bill.paidDate
    else:
        today = timezone.now()
        # calculate amount of time left
        date_left = bill.deadline - today

    days_left = date_left.total_seconds() / 86400
    if days_left >= 0:
        # It's still before the deadline
        return bill
    days_past_due = math.floor(days_left)
    fineCost = days_past_due * bill.fineRate
    if fineCost is not bill.fineCost:
        bill.fineCost = fineCost
        bill.save()
    return bill


def update_fine_cost_decorator(callback: Callable[P, R | None]):
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> R | None:
        rent_billing = callback(*args, **kwargs)
        if not rent_billing:
            return rent_billing
        return _calculate_fine_cost(rent_billing)

    return wrapper


def update_fine_costs_decorator(callback: Callable[P, List[R]]):
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> List[R]:

        billings = callback(*args, **kwargs)
        updated: List[R] = []

        for bill in billings:
            updated.append(_calculate_fine_cost(bill))

        return updated

    return wrapper


class BillingQueryFilter(TypedDict):
    deadline_from: NotRequired[DateTime]
    deadline_to: NotRequired[DateTime]
    paid_status: NotRequired[Optional[bool]]
    paid_at_from: NotRequired[DateTime]
    paid_at_to: NotRequired[DateTime]
    cycle_from: NotRequired[DateTime]
    cycle_to: NotRequired[DateTime]
    fineCostMin: NotRequired[float]
    fineCostMax: NotRequired[float]
