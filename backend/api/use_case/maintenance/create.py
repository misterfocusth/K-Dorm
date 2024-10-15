# Django
from typing import TypedDict
from django.db import transaction

# Repositories
from api.repository.maintenance_repository import MaintenanceRepository
from api.repository.file_repository import create_flie
from api.repository.firebase_storage import upload_file_to_bucket

# Utils
from backend.layer.use_case import usecase
from utils.firebase_storage import get_bucket_location


class CreateMaintenanceTicketPayload(TypedDict):
    title: str
    description: str
    location: str


@transaction.atomic
@usecase(only_authenticated=True)
def create_ticket(request, payload: CreateMaintenanceTicketPayload):

    # Create Maintenance Ticket
    maintenance_ticket = MaintenanceRepository.create_maintenance_ticket(
        title=payload["title"],
        description=payload["description"],
        location=payload["location"],
        user=request.ctx.user,
    )

    # Upload and Save Files
    uploaded_files = request.FILES.getlist("files")

    for file in uploaded_files:
        bucket_location = get_bucket_location(
            file, maintenance_ticket=maintenance_ticket
        )

        upload_result = upload_file_to_bucket(file, bucket_location)

        file = create_flie(
            handle=upload_result["filename"],
            note="",
            path=upload_result["file_url"],
            maintenanceTicket=maintenance_ticket,
        )

    maintenance_ticket.refresh_from_db()

    return maintenance_ticket
