install:
	@make clean
	@make build
	@make up
	docker compose exec backend npm install
	docker compose exec frontend npm install
	docker compose exec backend cp .env.example .env
	docker compose exec frontend cp .env.example .env
	docker compose exec db bash -c 'mysql -uroot -p$$MYSQL_ROOT_PASSWORD -e "GRANT ALL ON accounts_book.* TO user;"'
clean:
	docker compose down --rmi all --volumes --remove-orphans
build:
	docker compose build --no-cache --force-rm
sql:
	docker compose exec db bash -c 'mysql -u $$MYSQL_USER -p$$MYSQL_PASSWORD $$MYSQL_DATABASE'
create-migration:
	docker compose exec backend ash -c 'npm run typeorm migration:create src/orm/migrations/$(file)'
generate-migration:
	docker compose exec backend ash -c 'npm run typeorm migration:generate -- ./src/orm/migrations/$(file) -d dist/orm/config/ormconfig.js'
sync-database:
	docker compose exec backend ash -c 'npm run typeorm schema:sync -- -d dist/orm/config/ormconfig.js'
# help:
#     @grep "^[a-zA-Z\-]*:" Makefile | grep -v "grep" | sed -e 's/^/make /' | sed -e 's/://'
