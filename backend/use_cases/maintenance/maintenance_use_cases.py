from api.repository.maintenance import MaintenanceRepository
from interfaces.request_with_context import RequestWithContext


class MaintenanceTicketUserCase:
    @staticmethod
    def update_maintenance_ticket(request: RequestWithContext, pk: int, serializer):
        return MaintenanceRepository.update_maintenance_ticker_by_id(id=pk, data=serializer.validated_data)

    @staticmethod
    def get_student_maintenance_tickets(request: RequestWithContext):
        return MaintenanceRepository.get_maintenance_ticket_by_student(request.ctx.user)

    @staticmethod
    def get_all_maintenance_tickets(request: RequestWithContext):
        return MaintenanceRepository.get_all_maintenance_tickets()

    @staticmethod
    def get_maintenance_ticket_by_id(request: RequestWithContext, pk: int):
        return MaintenanceRepository.get_maintenance_ticket_by_id(pk)
