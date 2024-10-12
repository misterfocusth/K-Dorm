from repositories.maintenance_repository import get_maintenance_ticket_by_student, get_all_maintenance_tickets, get_maintenance_ticket_by_id


def handle_get_student_maintenance_tickets(request):
    return get_maintenance_ticket_by_student(request.user.student)


def handle_get_all_maintenance_tickets(request):
    return get_all_maintenance_tickets()


def handle_get_maintenance_ticket_by_id(request, pk):
    return get_maintenance_ticket_by_id(pk)
