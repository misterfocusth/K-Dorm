# Model
from domain.models import MaintenanceTicket
from api.repository.student import StudentRepository
from api.repository.mainternance_staff import MaintenanceStaffRepository
import datetime


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
        print('maintenance_ticket', maintenance_ticket)

        maintenance_staff_id = data['maintenanceStaffId']
        print('maintenance_staff_id', maintenance_staff_id)

        maintenance_staff = MaintenanceStaffRepository.get_maintenance_staff_account_by_id(
            maintenance_staff_id)
        print('maintenance_staff', maintenance_staff)

        if maintenance_ticket and maintenance_staff:
            print('maintenance_ticket and maintenance_staff')

            maintenance_ticket.title = data['title']
            maintenance_ticket.description = data['description']
            maintenance_ticket.location = data['location']
            maintenance_ticket.maintenanceStaff = maintenance_staff  # type: ignore
            maintenance_ticket.isResolved = True
            maintenance_ticket.resolvedAt = datetime.datetime.now()

            maintenance_ticket.save()
            return maintenance_ticket
        else:
            raise MaintenanceTicket.DoesNotExist
