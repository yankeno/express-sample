import express from "express";
import { addSpending, loadMonthlySpendings } from "~/services/spendingService";

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const response = await addSpending(
      req.body.user_id,
      req.body.category_id,
      req.body.date,
      req.body.price,
      req.body.description && req.body.description,
      req.body.comment && req.body.comment
    );
    return res.send({
      message: "successful",
      data: response,
    });
  } catch {
    return res.status(400).send({
      message: "The given data was invalid",
    });
  }
};

export const list = async (req: express.Request, res: express.Response) => {
  try {
    const response = await loadMonthlySpendings(
      Number(req.query.id),
      String(req.query.month)
    );
    return res.send({
      message: "successful",
      data: response,
    });
  } catch {
    return res.status(400).send({
      message: "The given data was invalid",
    });
  }
};
