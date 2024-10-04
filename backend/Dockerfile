# Use official Python image
FROM python:3.12

# Set working directory
WORKDIR /app

# Install curl to download the file
RUN apt-get update && apt-get install -y curl

# Declare the build argument for the URL
ARG FILE_URL

# Use the build argument to download the file using curl
RUN curl -o /tmp/your-file-name ${FILE_URL}

# Copy the downloaded file to the desired container directory
COPY /tmp/your-file-name /app/firebase/k-dorm-745f0-firebase-adminsdk-vpaem-b89972a630.json

# Clean up apt cache to reduce image size
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy requirements file and install dependencies
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copy the Django project files
COPY . /app/

# Expose the port Django runs on
EXPOSE 8000

# Run Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
