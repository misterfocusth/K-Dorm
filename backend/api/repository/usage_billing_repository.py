from turtle import update
from typing import List, Literal, NotRequired, Optional, TypedDict, Unpack
from api.repository import residence_repository
from api.repository.utils import BillingQueryFilter, update_fine_costs_decorator
from core.environment import env
from domain.models import UsageBilling
from datetime import datetime as DateTime
from django.db.models.manager import BaseManager


class UsageBillingFilter(BillingQueryFilter):
    waterUsageFrom: NotRequired[float]
    waterUsageTo: NotRequired[float]
    waterCostFrom: NotRequired[float]
    waterCostTo: NotRequired[float]
    electricityUsageFrom: NotRequired[float]
    electricityUsageTo: NotRequired[float]
    electricityCostFrom: NotRequired[float]
    electricityCostTo: NotRequired[float]
    residence_id: NotRequired[str]


"""
    Get list of usage billings by student id, (fetch from latest active residence)
"""


def _filter(
    query: BaseManager[UsageBilling],
    **filter: Unpack[UsageBillingFilter],
):
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

    if filter.get("electricityUsageFrom") is not None:
        query = query.filter(electricityUsage__gte=filter.get("electricityUsageFrom"))
    if filter.get("electricityUsageTo") is not None:
        query = query.filter(electricityUsage__lte=filter.get("electricityUsageTo"))
    if filter.get("electricityCostFrom") is not None:
        query = query.filter(electricityCost__gte=filter.get("electricityCostFrom"))
    if filter.get("electricityCostTo") is not None:
        query = query.filter(electricityCost__lte=filter.get("electricityCostTo"))

    if filter.get("waterUsageFrom") is not None:
        query = query.filter(waterUsage__gte=filter.get("waterUsageFrom"))
    if filter.get("waterUsageTo") is not None:
        query = query.filter(waterUsage__lte=filter.get("waterUsageTo"))
    if filter.get("waterCostFrom") is not None:
        query = query.filter(waterCost__gte=filter.get("waterCostFrom"))
    if filter.get("waterCostTo") is not None:
        query = query.filter(waterCost__lte=filter.get("waterCostTo"))

    if filter.get("fineCostMin") is not None:
        query = query.filter(fineCost__gte=filter.get("fineCostMin"))
    if filter.get("fineCostMax") is not None:
        query = query.filter(fineCost__lte=filter.get("fineCostMax"))

    if filter.get("residence_id"):
        query = query.filter(roomId=filter.get("residence_id"))

    return query


@update_fine_costs_decorator
def get_list_by_student_pk(
    studentPk: int, **filter: Unpack[UsageBillingFilter]
) -> List[UsageBilling]:

    residences = residence_repository.get_list(studentPk=studentPk)
    if len(residences) == 0:
        return []

    usage_billings = []

    for residence in residences:
        filter["residence_id"] = residence.pk
        bills = get_list(**filter)
        usage_billings += bills

    return list(usage_billings)


@update_fine_costs_decorator
def get_list(
    **kwargs: Unpack[UsageBillingFilter],
) -> List[UsageBilling]:
    query = UsageBilling.objects
    query = _filter(query, **kwargs)

    usage_billings = query.all()

    return list(usage_billings)


def update_usage_cost(
    bill: UsageBilling,
    waterUsage: int | None = None,
    electricityUsage: int | None = None,
) -> UsageBilling:
    if waterUsage is not None:
        bill.waterUsage = waterUsage
        bill.waterCost = waterUsage * float(env["WATER_COST_RATE"])
    if electricityUsage is not None:
        bill.electricityUsage = electricityUsage
        bill.electricityCost = electricityUsage * float(env["ELECTRICITY_COST_RATE"])
    bill.save()
    return bill
