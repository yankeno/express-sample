# ハマりポイント

- 多対多リレーションで中間テーブルや外部キーの名称を TypeORM のデフォルト以外にする方法は？  
  -> [ドキュメント](https://typeorm.io/relations#joincolumn-options)の通り `@JoinColumn` でオプションを指定することで任意の名前にできる

- 中間テーブルのカラム順序を指定する方法は？  
  -> サポートされていないので別途マイグレーションを作成する必要がある

- 使用した TypeORM のバージョンにおいては createConnection ではなく initialize でコネクションを確立する - chatGPT はこのように回答してきたが誤り

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

# 参考 URL

- [typeorm の設定を ormconfig.ts から読み込む](https://zenn.dev/msksgm/articles/20211107-typeorm-ormconfig)
- [Generating migrations with cli](https://github.com/typeorm/typeorm/issues/8810)
