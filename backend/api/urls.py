import api.views.auth as auth_views
import api.views.maintenance as maintenance
import api.views.account as account
from django.urls import path

urlpatterns = [
    # Tasks API Route
    # path("/tasks", task_views.get_tasks, name="task"),
    # # Task Detail API
    # path("/tasks/<int:pk>", task_views.TaskDetail.as_view(), name="task_detail"),
]

# AUTHENTICATION URLS
urlpatterns += [
    path("auth/me", auth_views.get_current_user, name="getme"),
    path("auth/signin", auth_views.signin, name="signin"),
]

# MAINTENANCE URLS
urlpatterns += [
    path('student/maintenance', maintenance.student_maintenance_ticket),
    path('student/maintenance/<int:pk>',
         maintenance.student_maintenance_ticket_detail),
    path('staff/maintenance', maintenance.staff_maintenance_tickets),
]

# ACCOUNT URLS
urlpatterns += [
    path('staff/account', account.staff_account),
    path('staff/account/<int:id>', account.edit_staff_account),
]
