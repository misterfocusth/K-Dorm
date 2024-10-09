.PHONY: start backend frontend stop kill_ports

# Load the .env file
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

BACKEND_PORT ?= 8000
FRONTEND_PORT ?= 3000

start: backend frontend

backend:
	@echo "Starting backend"
	@if [ ! -d "./myvenv" ]; then \
		echo "myvenv not found, creating virtual environment..."; \
		python3 -m venv myvenv && . ./myvenv/bin/activate && pip install -r ./backend/requirements.txt; \
	else \
		echo "myvenv found, activating virtual environment..."; \
	fi
	. ./myvenv/bin/activate && cd ./backend && python manage.py runserver &

frontend:
	@echo "Starting frontend"
	cd ./frontend && pnpm dev

compose-dev:
	@echo "Starting docker-compose - development"
	docker-compose -f docker-compose.dev.yml up --build -d

compose-prod:
	@echo "Starting docker-compose - production" 
	docker-compose -f docker-compose.prod.yml up --build -d

kill_ports:
	@echo "Killing processes on ports $(BACKEND_PORT) and $(FRONTEND_PORT)"
	@for PORT in $(BACKEND_PORT) $(FRONTEND_PORT); do \
		PID=$$(lsof -t -i :$$PORT); \
		if [ -n "$$PID" ]; then \
			kill $$PID && echo "Killed process $$PID on port $$PORT"; \
		else \
			echo "No process found on port $$PORT"; \
		fi \
	done
