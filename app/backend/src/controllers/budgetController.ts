import express from "express";
import { loadAllBudgets, upsertBudgets } from "~/services/budgetService";
import { plainToClass } from "class-transformer";
import { Budget } from "~/orm/entities/budget/Budget";

export const index = async (req: express.Request, res: express.Response) => {
  try {
    if (!req.query.id) {
      throw new Error();
    }
    const budgets = await loadAllBudgets(Number(req.query.id));
    return res.send({
      message: "successful",
      data: budgets,
    });
  } catch (e) {
    return res.status(400).send({
      message: "The given data was invalid",
    });
  }
};

export const upsert = async (req: express.Request, res: express.Response) => {
  try {
    if (!req.body) {
      throw new Error();
    }
    const budgets: Array<Budget> = [];
    req.body.forEach((v: any) => {
      let budgetObj: any = {
        user_id: v.user_id,
        period_id: v.period_id,
        amount: v.amount,
      };
      if (v.id) {
        budgetObj = {
          id: v.id,
          ...budgetObj,
        };
      }
      const budget = plainToClass(Budget, budgetObj);
      budgets.push(budget);
    });
    await upsertBudgets(budgets);
    return res.send({ message: "successful" });
  } catch (e) {
    return res.status(400).send({
      message: "The given data was invalid",
    });
  }
};
