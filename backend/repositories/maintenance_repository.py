# Model
from domain.models import MaintenanceTicket


def create_maintenance_ticket(title, description, location, student):
    maintenance_ticket = MaintenanceTicket.objects.create(
        title=title,
        description=description,
        location=location,
        student=student
    )
    maintenance_ticket.save()

    return maintenance_ticket


def get_maintenance_ticket_by_student(student):
    return MaintenanceTicket.objects.filter(student=student).all()


def get_all_maintenance_tickets():
    return MaintenanceTicket.objects.all()


def get_maintenance_ticket_by_id(id):
    maintenance_ticket = MaintenanceTicket.objects.filter(id=id).first()
    if maintenance_ticket:
        return maintenance_ticket
    return None
