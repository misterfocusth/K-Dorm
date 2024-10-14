from datetime import datetime as DateTime
import math
from typing import List, Literal, NotRequired, Optional, ParamSpec, TypedDict, Unpack
from backend.api.repository.utils import (
    BillingQueryFilter,
    update_fine_cost_decorator,
    update_fine_costs_decorator,
)
from domain.models import RentBilling


class RentBillingFilter(BillingQueryFilter):
    rentCostMin: NotRequired[float]
    rentCostMax: NotRequired[float]
    student_pk: NotRequired[int]


@update_fine_costs_decorator
def get_list(
    **filter: Unpack[RentBillingFilter],
) -> List[RentBilling]:
    query = RentBilling.objects

    if filter.get("paid_status") == True:
        query = query.filter(isPaid=True)
        if filter.get("paid_at_from"):
            query = query.filter(paidDate__gte=filter.get("paid_at_from"))
        if filter.get("paid_at_to"):
            query = query.filter(paidDate__lte=filter.get("paid_at_to"))
    elif filter.get("paid_status") == False:
        query = query.filter(isPaid=False)

    if filter.get("deadline_from"):
        query = query.filter(deadline__gte=filter.get("deadline_from"))
    if filter.get("deadline_to"):
        query = query.filter(deadline__lte=filter.get("deadline_to"))

    if filter.get("cycle_from"):
        query = query.filter(cycle__gte=filter.get("cycle_from"))
    if filter.get("cycle_to"):
        query = query.filter(cycle__lte=filter.get("cycle_to"))

    if filter.get("rentCostMin") is not None:
        query = query.filter(rentCost__gte=filter.get("rentCostMin"))
    if filter.get("rentCostMax") is not None:
        query = query.filter(rentCost__lte=filter.get("rentCostMax"))

    if filter.get("fineCostMin") is not None:
        query = query.filter(fineCost__gte=filter.get("fineCostMin"))
    if filter.get("fineCostMax") is not None:
        query = query.filter(fineCost__lte=filter.get("fineCostMax"))

    if filter.get("student_id"):
        query = query.filter(student_id=filter.get("student_id"))

    usage_billings = query.all()

    return list(usage_billings)


@update_fine_cost_decorator
def get_by_id(id: str) -> RentBilling | None:
    try:
        rent_billing = RentBilling.objects.get(id=id)
        return rent_billing
    except RentBilling.DoesNotExist:
        return None
    except Exception as e:
        raise e
