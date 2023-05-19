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

- 現状カラムの順序を指定する方法はないので諦める

## Nuxt のホットリロードが効かない

- 効いているが反映が遅いだけだった。また pages の変更内容はホットリロードされるのに対して、components はリロードしないと反映されない。

## Nuxt で axios が使えない

- エラーメッセージ

```
Cannot find name '$axios'.ts(2304)
```

# 実装予定

## ダッシュボードで実装するグラフ

- 月内の支出額をカテゴリごとに表示する円グラフ
- 支出の額を時系列で表示する棒グラフ
  - 表示範囲はカレンダーで選択可能とする
  - 週ごと、月ごとで表示可能とする

# 使用ライブラリ

# 参考 URL

- [typeorm の設定を ormconfig.ts から読み込む](https://zenn.dev/msksgm/articles/20211107-typeorm-ormconfig)
- [Generating migrations with cli](https://github.com/typeorm/typeorm/issues/8810)