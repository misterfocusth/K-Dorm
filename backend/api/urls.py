from urllib.parse import urlsplit
import api.views.auth as auth_views
import api.views.maintenance as maintenance
import api.views.account as account
from django.urls import path

from api.views.building import building_list_view
from api.views.room import room_detail_view, room_list_view
from api.views.building import building_detail_view
from api.views.recruitmenet_wave import recruitment_wave_list_view
from api.views.recruitmenet_wave import recruitment_wave_detail_view
from api.views.activity_category import activity_category_list_view
from api.views.student import student_detail_view, student_list_view

urlpatterns = [
    # Tasks API Route
    # path("/tasks", task_views.get_tasks, name="task"),
    # # Task Detail API
    # path("/tasks/<int:pk>", task_views.TaskDetail.as_view(), name="task_detail"),
]

# AUTHENTICATION URLS
urlpatterns += [
    path("auth/me", auth_views.get_current_user, name="getme"),
    # DEPRECATED
    path("auth/signin", auth_views.signin, name="signin"),
]

# MAINTENANCE URLS
urlpatterns += [
    path("student/maintenance", maintenance.student_maintenance_ticket),
    path("student/maintenance/<str:pk>", maintenance.student_maintenance_ticket_detail),
    path("staff/maintenance", maintenance.staff_maintenance_tickets),
]

# BUILDING URLS
urlpatterns += [
    path("staff/building", building_list_view.staff_view),
    path("staff/building/<str:building_id>", building_detail_view.staff_view),
    path("building/<str:building_id>", building_detail_view.view),
]

# ROOM URLS
urlpatterns += [
    path("staff/room", room_list_view.view),
    path("room/<str:room_id>", room_detail_view.view),
]

# RECRUITMENT WAVE URLS
urlpatterns += [
    path("recruitment_wave", recruitment_wave_list_view.view),
    path("recruitment_wave/<str:wave_id>", recruitment_wave_detail_view.view),
]

# ACCOUNT URLS
urlpatterns += [
    path("staff/account", account.staff_account),
    path("staff/account/<int:id>", account.edit_staff_account),
]

# STUDENT URLS
urlpatterns += [
    path("student", student_list_view.view),
    path("student/<str:pk>", student_detail_view.view),
]

# ACTIVITY CATEGORY URLS
urlpatterns += [
    path(
        "staff/activity_category/<str:activity_category_id>",
        activity_category_list_view.detail_view,
    ),
    path("staff/activity_category", activity_category_list_view.view),
]
