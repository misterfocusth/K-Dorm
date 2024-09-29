from django.contrib import admin
from django.urls import include, path

# API Views
import api.views.task as task_views

urlpatterns = [
    path('admin/', admin.site.urls),

    # Auth
    path('api/auth/', include('authentication.urls')),

    # APIs
    path('/api/', include('api.urls')),

    path('api/tasks', task_views.Task.as_view(), name='task'),
    # Task Detail API
    path('api/tasks/<int:pk>', task_views.TaskDetail.as_view(), name='task_detail'),
]
