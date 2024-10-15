from typing import TypedDict
from api.repository.maintenance_repository import MaintenanceRepository
from backend.api.repository.maintenance_staff_repository import (
    MaintenanceStaffRepository,
)
from backend.exception.auth.unauthenticated import UnauthenticatedException
from backend.interfaces.context import Context
from backend.layer.use_case import usecase

from .create import create


class UpdateMainternanceTicketPayload(TypedDict):
    description: str
    location: str
    title: str


@usecase()
def update_details(context: Context, pk: str, payload: UpdateMainternanceTicketPayload):
    return MaintenanceRepository.update_maintenance_ticker_by_id(
        id=pk,
        data={
            "description": payload["description"],
            "location": payload["location"],
            "title": payload["title"],
        },
    )


@usecase(
    only_authenticated=True,
)
def resolve_ticket(context: Context, ticket_id: str):

    user = context.user
    if user is None:
        raise UnauthenticatedException("User is not authenticated")

    maintenanceStaff = MaintenanceStaffRepository.get_by_id(user.pk)
    if maintenanceStaff is None:
        raise UnauthenticatedException("User is not maintenance staff")

    return MaintenanceRepository.resolve_maintenance_ticket(
        ticket_id=ticket_id,
        maintenance_staff_id=maintenanceStaff.pk,
    )


@usecase(only_authenticated=True)
def get_student_maintenance_tickets(context: Context):
    if context.user:
        return MaintenanceRepository.get_maintenance_ticket_by_student(context.user)
    raise UnauthenticatedException("User is not authenticated")


@usecase(only_authenticated=True)
def get_all_maintenance_tickets(context: Context):
    return MaintenanceRepository.get_all_maintenance_tickets()


@usecase()
def get_maintenance_ticket_by_id(context: Context, pk: str):
    return MaintenanceRepository.get_maintenance_ticket_by_id(pk)
