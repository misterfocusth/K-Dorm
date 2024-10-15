from repositories.maintenance_repository import get_maintenance_ticket_by_student, get_all_maintenance_tickets, get_maintenance_ticket_by_id
from interfaces.request_with_context import RequestWithContext


def handle_get_student_maintenance_tickets(request: RequestWithContext):
    return get_maintenance_ticket_by_student(request.ctx.user)


def handle_get_all_maintenance_tickets(request: RequestWithContext):
    return get_all_maintenance_tickets()


def handle_get_maintenance_ticket_by_id(request: RequestWithContext, pk: int):
    return get_maintenance_ticket_by_id(pk)
