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
