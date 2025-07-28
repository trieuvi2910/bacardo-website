# Makefile
.PHONY: build start stop restart logs clean deploy

build:
	@echo "Building Docker image..."
	@docker build -t bardo:latest .

start:
	@echo "Starting containers..."
	@docker-compose up -d

stop:
	@echo "Stopping containers..."
	@docker-compose down

restart: stop start

logs:
	@docker-compose logs -f

clean:
	@echo "Cleaning up..."
	@docker-compose down -v
	@docker system prune -f

deploy:
	@echo "Deploying..."
	@./scripts/deploy.sh production

dev:
	@echo "Starting development environment..."
	@docker-compose -f docker-compose.dev.yml up -d 