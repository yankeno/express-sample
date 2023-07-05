import express from "express";
import { loadAllBudgets } from "~/services/budgetService";

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
