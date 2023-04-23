# docker-composeコマンド
up:
	docker-compose up -d
build:
	docker-compose up -d --build
down:
	docker-compose down
restart:
	docker-compose down
	docker-compose up -d --build

# nuxtの導入(ファイルの追記あり)
nuxt:
	npx create-nuxt-app frontend
	cp .env.example .env
	docker-compose up -d --build
	docker-compose exec frontend npm install --save @nuxtjs/proxy @nuxtjs/dotenv
	docker-compose exec frontend touch .env
	docker-compose exec frontend npm install sass-loader@10.1.1 sass --save-dev
	docker-compose exec app cp .env.example .env

# typescriptの導入(ファイルの追記あり)
typescript:
	docker-compose exec frontend npm install --save-dev @nuxt/types
	docker-compose exec frontend touch shims-vue.d.ts

# composition-apiの導入(ファイルの追記あり)
composition-api:
	docker-compose exec frontend npm install @nuxtjs/composition-api --save
