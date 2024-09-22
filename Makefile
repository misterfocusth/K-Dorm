.PHONY: start backend frontend stop kill_port

BACKEND_PORT ?= 8000
FRONTEND_PORT ?= 3000

start: backend frontend

backend:
	@echo "Starting backend"
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
