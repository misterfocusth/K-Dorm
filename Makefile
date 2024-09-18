.PHONY: start backend frontend

start: backend frontend

backend:
	@echo "Starting backend"
	source ./myvenv/bin/activate && cd ./backend && python manage.py runserver &

frontend:
	@echo "Starting frontend"
	cd ./frontend && pnpm dev