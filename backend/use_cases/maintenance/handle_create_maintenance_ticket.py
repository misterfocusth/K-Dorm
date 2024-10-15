# Django
from django.db import transaction

# Repositories
from repositories.maintenance_repository import MaintenanceRepository
from repositories.file_repository import create_flie
from repositories.firebase_storage_repository import upload_file_to_bucket

# Utils
from utils.firebase_storage import get_bucket_location


@transaction.atomic
def handle_create_maintenance_ticket(request, serializer):
    validated_data = serializer.validated_data

    # Create Maintenance Ticket
    maintenance_ticket = MaintenanceRepository.create_maintenance_ticket(
        title=validated_data['title'],
        description=validated_data['description'],
        location=validated_data['location'],
        user=request.ctx.user
    )

    # Upload and Save Files
    uploaded_files = request.FILES.getlist('files')

    for file in uploaded_files:
        bucket_location = get_bucket_location(
            file, maintenance_ticket=maintenance_ticket)

        upload_result = upload_file_to_bucket(file, bucket_location)

        file = create_flie(
            handle=upload_result['filename'],
            note="",
            path=upload_result['file_url'],
            maintenanceTicket=maintenance_ticket
        )

    maintenance_ticket.refresh_from_db()

    return maintenance_ticket
