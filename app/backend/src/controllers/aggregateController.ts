import express from "express";
import { dataSource } from "../orm/config/ormconfig";
import { Spending } from "../orm/entities/spending/Spending";
import { loadBeginningOfMonth, loadToday } from "../helpers/dateHelper";

const repo = dataSource.getRepository(Spending);

export const category = async (req: express.Request, res: express.Response) => {
  try {
    const id = Number(req.query.id);
    const start = req.query.from ? req.query.from : loadBeginningOfMonth();
    const end = req.query.to ? req.query.to : loadToday();
    const result = await repo
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
    console.log(JSON.stringify(result));
    return res.send({
      message: "successful",
      data: `spendings: ${result}`,
    });
  } catch {
    return res.status(400).send({
      message: "The given data was invalid",
    });
  }
};

export const amount = async (req: express.Request, res: express.Response) => {};
