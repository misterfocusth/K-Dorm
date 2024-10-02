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
		python3 -m venv myvenv && source ./myvenv/bin/activate && pip install -r requirements.txt; \
	else \
		echo "myvenv found, activating virtual environment..."; \
	fi
	source ./myvenv/bin/activate && cd ./backend && python manage.py runserver &

frontend:
	@echo "Starting frontend"
	cd ./frontend && pnpm dev

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
