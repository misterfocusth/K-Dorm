# Use official Python image
FROM python:3.12

# Set working directory
WORKDIR /app

# Copy Firebase config file
ARG CONFIG_FILE_PATH
COPY ${CONFIG_FILE_PATH} /app/firebase

# Copy requirements file and install dependencies
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copy the Django project files
COPY . /app/

# Expose the port Django runs on
EXPOSE 8000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-python-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

# Run Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]