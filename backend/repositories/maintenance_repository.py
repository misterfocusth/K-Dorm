# Model
from domain.models import MaintenanceTicket
from repositories.student import StudentRepository
from repositories.account_repository import AccountRepository


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

    @staticmethod
    def update_maintenance_ticker_by_id(id, data):
        maintenance_ticket = MaintenanceTicket.objects.filter(id=id).first()

        maintenance_staff_id = data.get('maintenance_staff_id')
        maintenance_staff = AccountRepository.get_maintenance_staff_account_by_id(
            maintenance_staff_id)

        if maintenance_ticket and maintenance_staff:
            maintenance_ticket.title = data.get('title')
            maintenance_ticket.description = data.get('description')
            maintenance_ticket.location = data.get('location')
            maintenance_ticket.maintenanceStaff = maintenance_staff.account.id
            maintenance_ticket.save()
            return maintenance_ticket
        else:
            raise MaintenanceTicket.DoesNotExist
