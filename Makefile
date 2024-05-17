run-dev:
	docker compose build
	docker compose watch

logs-dev:
	docker compose logs -f

run-prod:
	docker compose -f docker-compose.prod.yml up --build --detach

logs-prod:
	docker compose -f docker-compose.prod.yml logs -f

back-test-watch:
	docker compose exec back npm run test:watch

front-test-watch:
	docker compose exec front npm run test:watch
	
codegen:
	cd front && npm run graphql-codegen