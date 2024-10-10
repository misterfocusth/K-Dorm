from views.auth_views import signin, get_current_user
import api.views.task as task_views
from django.urls import path

urlpatterns = [
    # Tasks API Route
    path('/tasks', task_views.Task.as_view(), name='task'),

    # Task Detail API
    path('/tasks/<int:pk>', task_views.TaskDetail.as_view(), name='task_detail'),
]

# AUTHENTICATION URLS
urlpatterns += [
    path('auth/me', get_current_user, name='getme'),
    path('auth/signin', signin, name='signin'),
]
