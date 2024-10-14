import api.views.auth as auth
import api.views.task as task_views
from django.urls import path

urlpatterns = [
    # Tasks API Route
    path("/tasks", task_views.get_tasks, name="task"),
    # Task Detail API
    path("/tasks/<int:pk>", task_views.TaskDetail.as_view(), name="task_detail"),
]

# AUTHENTICATION URLS
urlpatterns += [
    path("auth/me", auth.get_current_user, name="getme"),
    path("auth/signin", auth.signin, name="signin"),
]
