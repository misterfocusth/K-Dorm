def get_user_role(user_data):
    role = ""

    if user_data['student'] is not None:
        role = "STUDENT"
    if user_data['staff'] is not None:
        role = "STAFF"
    if user_data['maintenanceStaff'] is not None:
        role = "MAINTENANCE_STAFF"
    if user_data['securityStaff'] is not None:
        role = "SECURITY_STAFF"

    return role
