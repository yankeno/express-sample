# ER図

![accounts_book](https://github.com/yankeno/express-sample/assets/79403113/57a54de1-9964-40ff-9c75-f69d8fc837b2)

# ハマりポイント

## 多対多リレーションで中間テーブルや外部キーの名称を TypeORM のデフォルト以外にする方法がわからない

[ドキュメント](https://typeorm.io/relations#joincolumn-options)の通り `@JoinColumn` でオプションを指定することで任意の名前にできる

## TypeORM で中間テーブルのカラム順序を指定する方法がわからない

- サポートされていないので別途マイグレーションを作成する必要がある

- 使用した TypeORM のバージョンにおいては createConnection ではなく initialize でコネクションを確立する - chatGPT はこのように回答してきたが、これは古いバージョンの記法で現在は deprecated

```javascript
import { createConnection } from "typeorm";

createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "your-username",
  password: "your-password",
  database: "your-database-name",
  entities: [__dirname + "/entities/*.js"],
  synchronize: true,
})
  .then((connection) => {
    console.log("Connected to MySQL database");
  })
  .catch((error) => {
    console.log("Error connecting to MySQL database", error);
  });
```

## TypeORM のエンティティで自動作成したテーブルでカラムの順序を指定する方法がわからない

- 現状カラムの順序を指定する方法はないようなので諦める

## Nuxt のホットリロードが効かない

- 効いているが反映が遅いだけだった。また pages の変更内容はホットリロードされるのに対して、components はリロードしないと反映されない。

## Nuxt で this.$axios が使えない

ChatGPT によれば以下とのこと

```
TypeScriptはthis.$axiosがコンテキストに存在することをデフォルトで知りません。
```

よって this.$axios を使用する関数内で正しい型定義をしてやることで解消

## apexchart の読み込みでエラーが発生する

```
window is not defined
```

ChatGPT によれば以下とのこと

```
Nuxt.jsでは、サーバーサイドレンダリング（SSR）がデフォルトで有効になっています。これは、初回のページロードを高速化し、SEOを改善するために行われます。しかし、この結果、クライアントサイド専用のコード（例えば、windowやdocumentを使用するコード）がサーバーサイドで実行されるとエラーが発生します。
```

また、[apexchart の issue](https://github.com/apexcharts/vue-apexcharts/issues/103)によると`<no-ssr>`で囲む必要がある。

## リレーション先のカラムを指定したい

こんな SQL を ORM で表現したい

```sql
SELECT
    spendings.id,
    spendings.date,
    spendings.price,
    spendings.description,
    spendings.comment,
    category.id,
    category.name
FROM
    spendings
        JOIN
    category ON spendings.category_id = category.id
WHERE
    user_id = 1 AND date LIKE '2023-06-%'
ORDER BY date ASC;
```

できないようなので createQueryBuilder を使うしかない

## Docker 起動時に環境変数が読み込まれない

以下のような WARNING が出て、環境変数の読み込みに失敗する。

```bash
WARN[0000] The "BACKEND_PORT" variable is not set. Defaulting to a blank string.
WARN[0000] The "FRONTEND_PORT" variable is not set. Defaulting to a blank string.
WARN[0000] The "DB_PORT" variable is not set. Defaulting to a blank string.
WARN[0000] The "MYSQL_ROOT_PASSWORD" variable is not set. Defaulting to a blank string.
WARN[0000] The "TZ" variable is not set. Defaulting to a blank string.
WARN[0000] The "MYSQL_DATABASE" variable is not set. Defaulting to a blank string.
WARN[0000] The "MYSQL_USER" variable is not set. Defaulting to a blank string.
WARN[0000] The "MYSQL_PASSWORD" variable is not set. Defaulting to a blank string.
```

プロジェクトルート以外で Docker を立ち上げた場合に、`docker-compose.yml`から`.env`が参照できずこのような現象が発生する。

## ログインが成功しているがリフレッシュトークンが自動的に設定されない

nuxt.config.js の設定不備

```javascript
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/',
    },
    strategies: {
      local: {
        scheme: 'refresh', // <- ここの設定が必要
        token: {
          property: 'accessToken',
          maxAge: 60 * 30,
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken',
          maxAge: 60 * 60 * 24 * 7,
        },
        endpoints: {
          login: {
            url: '/api/auth/login',
            method: 'post',
            propertyName: 'accessToken',
          },
          logout: false,
          refresh: {
            url: '/api/auth/refresh',
            method: 'post',
            propertyName: 'accessToken',
          },
          user: { url: '/api/auth/user', method: 'get', propertyName: 'user' },
        },
        tokenRequired: true,
        tokenType: 'JWT',
      },
    },
  },
```

## ログイン後にリロードするとログイン画面に遷移する

色々と調べたが結局わからず。

- [Redirected to login after refreshing any protected page](https://github.com/nuxt-community/auth-module/discussions/1518)
- [user always redirected to login on refresh in nuxt.js auth](https://ja.wikipedia.org/wiki/%E7%99%BD%E9%B3%A5%E7%94%B1%E6%A0%84)
- [@nuxtjs/auth Why refresh page always redirect to login](https://stackoverflow.com/questions/58917958/nuxtjs-auth-why-refresh-page-always-redirect-to-login)

# 参考 URL

- [typeorm の設定を ormconfig.ts から読み込む](https://zenn.dev/msksgm/articles/20211107-typeorm-ormconfig)
- [Generating migrations with cli](https://github.com/typeorm/typeorm/issues/8810)
