require("module-alias/register");

import express from "express";
import routes from "./routes";
import "dotenv/config";
import { connectMysql } from "./orm/dbCreateConnection";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

const port: string = process.env.PORT || "3000";
app.listen(port, () => {
  connectMysql();
  console.log(`Server running on port ${port}`);
});
