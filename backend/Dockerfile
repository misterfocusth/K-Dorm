# Use official Python image
FROM python:3.12

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

COPY firebase /app/k-dorm-745f0-firebase-adminsdk-vpaem-b89972a630.json

# Copy requirements file and install dependencies
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copy the Django project files
COPY . /app/

# Set environment variables for Django
ENV DJANGO_SETTINGS_MODULE=backend.settings
ENV PORT 8000

# Expose the port Django runs on
EXPOSE 8000

# Run database migrations and start the Gunicorn server
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "backend.wsgi"]