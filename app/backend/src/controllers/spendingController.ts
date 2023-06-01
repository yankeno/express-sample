import express from "express";
import { addSpending } from "~/services/spendingService";

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const response = await addSpending(
      1,
      2,
      "2023-06-01",
      100,
      "Food",
      "Lunch at restaurant"
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
