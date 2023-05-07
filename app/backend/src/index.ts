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

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/example", exampleRouter);

// var express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
// var exampleRouter = require("./routes/example");

// var app = express();

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/example", exampleRouter);

// module.exports = app;
