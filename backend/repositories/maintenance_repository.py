# Model
from domain.models import MaintenanceTicket
from repositories.student import StudentRepository


class MaintenanceRepository:
    @staticmethod
    def create_maintenance_ticket(title, description, location, user):
        student = StudentRepository.get_student_by_uid(user.uid)
        maintenance_ticket = MaintenanceTicket.objects.create(
            title=title,
            description=description,
            location=location,
            student=student
        )
        maintenance_ticket.save()

        return maintenance_ticket

    @staticmethod
    def get_maintenance_ticket_by_student(user):
        return MaintenanceTicket.objects.filter(student__account=user).all()

    @staticmethod
    def get_all_maintenance_tickets():
        return MaintenanceTicket.objects.all()

    @staticmethod
    def get_maintenance_ticket_by_id(id):
        maintenance_ticket = MaintenanceTicket.objects.filter(id=id).first()
        if maintenance_ticket:
            return maintenance_ticket
        return None
