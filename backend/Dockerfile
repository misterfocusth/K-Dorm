# Use official Python image
FROM python:3.12

# Set working directory
WORKDIR /app

COPY firebase /app/k-dorm-745f0-firebase-adminsdk-vpaem-b89972a630.json

# Copy requirements file and install dependencies
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copy the Django project files
COPY . /app/

# Expose the port Django runs on
EXPOSE 8000

# Run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]