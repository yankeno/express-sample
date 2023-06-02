import express from "express";
import { addSpending } from "~/services/spendingService";

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const response = await addSpending(
      Number(req.body.user_id),
      Number(req.body.category_id),
      req.body.date,
      Number(req.body.price),
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
