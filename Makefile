run-dev:
	docker compose build
	docker compose watch

logs-dev:
	docker compose logs -f

run-prod:
	docker compose -f docker-compose.prod.yml up --build --detach

logs-prod:
	docker compose -f docker-compose.prod.yml logs -f

back-end-test-watch:
	docker compose exec back npm run test:watch

web-app-test-watch:
	docker compose exec front npm run test:watch
	
web-app-generate-graphql-types:
	cd web-app && npm run graphql-codegen