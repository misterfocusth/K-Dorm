from django.contrib import admin
from django.urls import include, path

# API Views
import api.views.task as task_views

urlpatterns = [
    # Tasks API Route
    path('/tasks', task_views.Task.as_view(), name='task'),

    # Task Detail API
    path('/tasks/<int:pk>', task_views.TaskDetail.as_view(), name='task_detail'),
]
