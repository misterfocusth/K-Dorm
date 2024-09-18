from django.contrib import admin
from django.urls import path

# API Views
import api.views.task as task_views

urlpatterns = [
    path('admin/', admin.site.urls),
    # Tasks API Route
    path('api/tasks/', task_views.Task.as_view(), name='task'),
    # Task Detail API
    path('api/tasks/<int:pk>/', task_views.TaskDetail.as_view(), name='task_detail'),
]
