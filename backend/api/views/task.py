# Django REST Framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

# Models
import domain.models as models

# Serializers
from serializers.task_serializer import TaskSerializer


@api_view(['GET'])
def get_tasks(request):
    tasks = models.Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(status=200, data={"result": serializer.data})


class Task(APIView):
    def get(self, request):
        tasks = models.Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(status=200, data={"result": serializer.data})

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskDetail(APIView):
    def get(self, request, pk):
        task = models.Task.objects.get(pk=pk)
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    def put(self, request, pk):
        task = models.Task.objects.get(pk=pk)
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        task = models.Task.objects.get(pk=pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
