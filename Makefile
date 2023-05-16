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
sync-package:
	
dump:
	docker compose exec db bash -c 'mysqldump --no-tablespaces -u$$MYSQL_USER -p$$MYSQL_PASSWORD $$MYSQL_DATABASE > /tmp/dump.sql'
	docker compose cp db:/tmp/dump.sql ./docker/tmp/dump.sql
restore:
	docker compose cp ./docker/tmp/dump.sql db:/tmp/dump.sql
	docker compose exec db bash -c 'mysql -u$$MYSQL_USER -p$$MYSQL_ROOT_PASSWORD $$MYSQL_DATABASE < /tmp/dump.sql'
truncate:	
	@echo "\033[31m[Danger]\033[0m All tables data will be deleted."; \
	read -p "Are you sure you want to run it? [y,N]: " yn; \
	case "$$yn" in \
		[yY]* ) docker compose exec db bash -c 'mysql -uroot -p$$MYSQL_ROOT_PASSWORD $$MYSQL_DATABASE -N -e "show tables" | while read table; do mysql -u root -p$$MYSQL_ROOT_PASSWORD -e "SET FOREIGN_KEY_CHECKS=0; truncate table $$table" $$MYSQL_DATABASE; done' ;; \
		* ) echo "exit";; \
	esac
