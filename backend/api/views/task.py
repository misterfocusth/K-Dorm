# Django REST Framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Models
import api.models as models

# Serializers
import api.serializers.task as serializers


class Task(APIView):
    def get(self, request):
        tasks = models.Task.objects.all()
        serializer = serializers.TaskSerializer(tasks, many=True)
        return Response(status=200, data={"result": serializer.data})

    def post(self, request):
        serializer = serializers.TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskDetail(APIView):
    def get(self, request, pk):
        task = models.Task.objects.get(pk=pk)
        serializer = serializers.TaskSerializer(task)
        return Response(serializer.data)

    def put(self, request, pk):
        task = models.Task.objects.get(pk=pk)
        serializer = serializers.TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        task = models.Task.objects.get(pk=pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
