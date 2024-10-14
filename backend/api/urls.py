import api.views.auth_views as auth_views
import api.views.maintenance_views as maintenance_views
import api.views.account_views as account_views
import api.views.task as task_views
from django.urls import path

urlpatterns = [
    # Tasks API Route
    # path("/tasks", task_views.get_tasks, name="task"),
    # # Task Detail API
    # path("/tasks/<int:pk>", task_views.TaskDetail.as_view(), name="task_detail"),
]

# AUTHENTICATION URLS
urlpatterns += [
    path("auth/me", auth.get_current_user, name="getme"),
    path("auth/signin", auth.signin, name="signin"),
]

# MAINTENANCE URLS
urlpatterns += [
    path('student/maintenance', maintenance_views.student_maintenance_ticket),
    path('student/maintenance/<int:pk>',
         maintenance_views.student_maintenance_ticket_detail),
    path('staff/maintenance', maintenance_views.staff_maintenance_tickets),
]

# ACCOUNT URLS
urlpatterns += [
    path('staff/account', account_views.staff_account),
    path('staff/account/<int:id>', account_views.edit_staff_account),
]
