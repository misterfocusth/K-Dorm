# K-Dorm

Intelligence Dormitory Management System for King Mongkut's Institute of Technology Ladkrabang (KMITL)

## Start Database in Developmemt (Using Docker)

```shell
# Create a new container running postgresql
docker-compose up -d
```

## Start Project in Development (Backend)

```shell
# Activate virtual environment
source ./myvenv/bin/activate

# Install python packages from requirements.txt
pip install -r requirements.txt

# Start django server
python manage.py runserver
```

## Start App in Development (Frontend)
