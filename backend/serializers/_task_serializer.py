# # Django REST Framework
# from rest_framework import serializers

# # Models
# from domain.models import Task


# class TaskSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Task
#         fields = '__all__'

#     def validate(self, data):
#         if len(data['description']) < 10:
#             raise serializers.ValidationError(
#                 'Description must be at least 10 characters long.')
#         if len(data['title']) < 5:
#             raise serializers.ValidationError(
#                 'Title must be at least 5 characters long.')
#         return data
