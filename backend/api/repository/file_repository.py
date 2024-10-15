# Model
from domain.models import File


def create_flie(handle, note, path, maintenanceTicket=None, activity=None):
    file = File.objects.create(
        handle=handle,
        note=note,
        path=path,
        maintenanceTicket=maintenanceTicket,
        activity=activity,
    )
    file.save()

    return file
