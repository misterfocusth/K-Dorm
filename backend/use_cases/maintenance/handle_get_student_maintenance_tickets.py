from repositories.maintenance_repository import get_maintenance_ticket_by_student


def handle_get_student_maintenance_tickets(request):
    return get_maintenance_ticket_by_student(request.user.student)
