import express from "express";
import moment from "moment";
import { dataSource } from "../orm/config/ormconfig";
import { Spending } from "../orm/entities/spending/Spending";
import { loadBeginningOfMonth, loadToday } from "../helpers/dateHelper";
import { constDate } from "../constants/date";

const repo = dataSource.getRepository(Spending);

export const category = async (req: express.Request, res: express.Response) => {
  try {
    const id = Number(req.query.id);
    const start: string = req.query.from
      ? moment(req.query.from as any).format(constDate.DefaultFormat)
      : loadBeginningOfMonth();
    const end: string = req.query.to
      ? moment(req.query.to as any).format(constDate.DefaultFormat)
      : loadToday();
    const response = await repo
      .createQueryBuilder("spendings")
      .select([
        "parentCategory.name AS parent_category_name",
        "SUM(spendings.price) AS amount",
      ])
      .innerJoin("spendings.user", "user")
      .innerJoin("spendings.category", "category")
      .innerJoin("category.parentCategory", "parentCategory")
      .where("date BETWEEN :start AND :end", { start: start, end: end })
      .andWhere("user.id = :userId", { userId: id })
      .groupBy("parentCategory.id")
      .orderBy("SUM(spendings.price)", "DESC")
      .getRawMany();
    return res.send({
      message: "successful",
      data: response,
      from: start,
      to: end,
    });
  } catch {
    return res.status(400).send({
      message: "The given data was invalid",
    });
  }
};

export const date = async (req: express.Request, res: express.Response) => {
  try {
    const id = Number(req.query.id);
    const start: string = req.query.from
      ? moment(req.query.from as any).format(constDate.DefaultFormat)
      : loadBeginningOfMonth();
    const end: string = req.query.to
      ? moment(req.query.to as any).format(constDate.DefaultFormat)
      : loadToday();
    const result = await repo
      .createQueryBuilder("spendings")
      .select(["date", "SUM(spendings.price) AS amount"])
      .innerJoin("spendings.user", "user")
      .where("date BETWEEN :start AND :end", { start: start, end: end })
      .andWhere("user.id = :userId", { userId: id })
      .groupBy("date")
      .orderBy("date")
      .getRawMany();
    // 日付を YYYY-MM-DD の形式に変更
    const response = result.map((record) => {
      return {
        date: moment(record.date).format(constDate.Date),
        amount: record.amount,
      };
    });
    return res.send({
      message: "successful",
      data: response,
      from: start,
      to: end,
    });
  } catch {
    return res.status(400).send({
      message: "The given data was invalid",
    });
  }
};

export const week = async (req: express.Request, res: express.Response) => {
  try {
    const id = Number(req.query.id);
    const start: string = req.query.from
      ? moment(req.query.from as any).format(constDate.DefaultFormat)
      : loadBeginningOfMonth();
    const end: string = req.query.to
      ? moment(req.query.to as any).format(constDate.DefaultFormat)
      : loadToday();
    const result = await repo
      .createQueryBuilder("spendings")
      .select([
        "SUBDATE(date, WEEKDAY(date)) as week",
        "SUM(spendings.price) AS amount",
      ])
      .innerJoin("spendings.user", "user")
      .where("date BETWEEN :start AND :end", { start: start, end: end })
      .andWhere("user.id = :userId", { userId: id })
      .groupBy("week")
      .orderBy("week")
      .getRawMany();
    // 日付を YYYY-MM-DD の形式に変更
    const response = result.map((record) => {
      return {
        date: moment(record.week).format(constDate.Date),
        amount: record.amount,
      };
    });
    return res.send({
      message: "successful",
      data: response,
      from: start,
      to: end,
    });
  } catch {
    return res.status(400).send({
      message: "The given data was invalid",
    });
  }
};
export const month = async (req: express.Request, res: express.Response) => {
  try {
    const id = Number(req.query.id);
    const start: string = req.query.from
      ? moment(req.query.from as any).format(constDate.DefaultFormat)
      : loadBeginningOfMonth();
    const end: string = req.query.to
      ? moment(req.query.to as any).format(constDate.DefaultFormat)
      : loadToday();
    const result = await repo
      .createQueryBuilder("spendings")
      .select([
        "DATE_FORMAT(date, '%Y-%m') as month",
        "SUM(spendings.price) AS amount",
      ])
      .innerJoin("spendings.user", "user")
      .where("date BETWEEN :start AND :end", { start: start, end: end })
      .andWhere("user.id = :userId", { userId: id })
      .groupBy("month")
      .orderBy("month")
      .getRawMany();
    // 日付を YYYY-MM-DD の形式に変更
    const response = result.map((record) => {
      return {
        date: moment(record.month).format(constDate.Date),
        amount: record.amount,
      };
    });
    return res.send({
      message: "successful",
      data: response,
      from: start,
      to: end,
    });
  } catch {
    return res.status(400).send({
      message: "The given data was invalid",
    });
  }
};
