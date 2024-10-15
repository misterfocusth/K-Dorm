def get_bucket_location(file, maintenance_ticket=None, activity=None):
    filename = file.name
    if maintenance_ticket is not None:
        return f"maintenance_tickets/{maintenance_ticket.id}/{filename}"
    elif activity is not None:
        return f"activities/{activity.id}/{filename}"
