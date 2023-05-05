import { DataSource } from "typeorm";

export const config = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  synchronize: true,
  logging: true,
  entities: ["src/orm/entities/**/*.ts"],
  migrations: ["src/orm/migrations/**/*.ts"],
  subscribers: ["src/orm/subscriber/**/*.ts"],
});
