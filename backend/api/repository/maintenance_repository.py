# Model
from typing import NotRequired, TypedDict
from xml.dom import NotFoundErr
from api.repository.maintenance_staff_repository import (
    MaintenanceStaffRepository,
)
from exception.application_logic.client.not_found import NotFoundException
from domain.models import Account, MaintenanceTicket
from api.repository.student_repository import StudentRepository
import datetime


class UpdateMaintenanceTicketPayload(TypedDict):
    title: str
    description: str
    location: str


class MaintenanceRepository:
    @staticmethod
    def create_maintenance_ticket(title, description, location, user):
        student = StudentRepository.get_by_account_uid(user.uid)
        maintenance_ticket = MaintenanceTicket.objects.create(
            title=title, description=description, location=location, student=student
        )
        maintenance_ticket.save()

        return maintenance_ticket

    @staticmethod
    def get_maintenance_ticket_by_student(user: Account):
        return MaintenanceTicket.objects.filter(student__account=user).all()

    @staticmethod
    def get_all_maintenance_tickets():
        return MaintenanceTicket.objects.all()

    @staticmethod
    def get_maintenance_ticket_by_id(id: str):
        maintenance_ticket = MaintenanceTicket.objects.filter(id=id).first()
        if maintenance_ticket:
            return maintenance_ticket
        return None

    @staticmethod
    def update_maintenance_ticker_by_id(id: str, data: UpdateMaintenanceTicketPayload):
        try:
            maintenance_ticket = MaintenanceTicket.objects.filter(id=id).first()

            if maintenance_ticket == None:
                raise MaintenanceTicket.DoesNotExist

            maintenance_staff_id = data.get("maintenanceStaffId")

            if maintenance_staff_id != None:
                maintenance_staff = MaintenanceStaffRepository.get_by_id(
                    maintenance_staff_id
                )

                if maintenance_staff:
                    print("maintenance_ticket and maintenance_staff")

                    maintenance_ticket.maintenanceStaff = maintenance_staff  # type: ignore

                    maintenance_ticket.save()
                    return maintenance_ticket
                else:
                    raise MaintenanceTicket.DoesNotExist

            maintenance_ticket.title = data["title"]
            maintenance_ticket.description = data["description"]
            maintenance_ticket.location = data["location"]
            maintenance_ticket.isResolved = True
            maintenance_ticket.resolvedAt = datetime.datetime.now()
        except MaintenanceTicket.DoesNotExist as e:
            raise NotFoundException("Maintenance Ticket not found")
        except Exception as e:
            raise e

    @staticmethod
    def resolve_maintenance_ticket(ticket_id: str, maintenance_staff_id: str):

        try:
            maintenance_ticket = MaintenanceRepository.get_maintenance_ticket_by_id(
                ticket_id
            )

            if maintenance_ticket == None:
                raise MaintenanceTicket.DoesNotExist

            maintenance_ticket.maintenanceStaff_id = maintenance_staff_id  # type: ignore
            maintenance_ticket.isResolved = True
            maintenance_ticket.resolvedAt = datetime.datetime.now()
            maintenance_ticket.save()

            return maintenance_ticket
        except MaintenanceTicket.DoesNotExist as e:
            raise NotFoundException("Maintenance Ticket not found")
