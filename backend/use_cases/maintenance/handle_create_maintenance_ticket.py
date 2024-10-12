from utils.account_utils import get_account_from_session

# Models
from domain.models import MaintenanceTicket, File

# Django
from django.db import transaction

# Firebase
from firebase_admin import storage


@transaction.atomic
def handle_create_maintenance_ticket(request, serializer):
    # Get Student Data From Session Data (TODO: Change to middleware)
    account = get_account_from_session(request)

    validated_data = serializer.validated_data

    # Create Maintenance Ticket
    maintenance_ticket = MaintenanceTicket.objects.create(
        title=validated_data['title'],
        description=validated_data['description'],
        location=validated_data['location'],
        student=account.student
    )

    # Upload and Save Files
    uploaded_files = request.FILES.getlist('files')

    for file in uploaded_files:
        filename = file.name
        bucket_location = f"maintenance_tickets/{
            maintenance_ticket.id}/{filename}"

        bucket = storage.bucket()

        blob = bucket.blob(bucket_location)
        blob.upload_from_file(file)
        blob.make_public()

        file_url = blob.public_url

        file = File.objects.create(
            handle=filename,
            note="",
            path=file_url,
            maintenanceTicket=maintenance_ticket
        )

    maintenance_ticket.refresh_from_db()

    return maintenance_ticket
