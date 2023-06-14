import express from "express";
import {
  aggregateByCategory,
  aggregateByDate,
  aggregateByMonth,
  aggregateByWeek,
  convertDate,
  loadDateBudjet,
  loadLatestSpendings,
  loadMonthBudjet,
  loadWeekBudjet,
} from "@/services/aggregateService";
import {
  CategoryResponse,
  DateResponse,
  MonthResponse,
  WeekResponse,
} from "@/types/aggregate";

export const category = async (req: express.Request, res: express.Response) => {
  try {
    const id = Number(req.query.id);
    const { start, end } = convertDate(
      req.query.from as string,
      req.query.to as string
    );
    const response: Array<CategoryResponse> = await aggregateByCategory(
      id,
      start,
      end
    );
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
    const { start, end } = convertDate(
      req.query.from as string,
      req.query.to as string
    );
    const spendings: Array<DateResponse> = await aggregateByDate(
      id,
      start,
      end
    );
    const budget = await loadDateBudjet(id);
    const budgets = new Array(spendings.length).fill(budget);
    return res.send({
      message: "successful",
      data: {
        spendings: spendings,
        budgets: budgets,
      },
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
    const { start, end } = convertDate(
      req.query.from as string,
      req.query.to as string
    );
    const spendings: Array<WeekResponse> = await aggregateByWeek(
      id,
      start,
      end
    );
    const budget = await loadWeekBudjet(id);
    const budgets = new Array(spendings.length).fill(budget);
    return res.send({
      message: "successful",
      data: {
        spendings: spendings,
        budgets: budgets,
      },
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
    const { start, end } = convertDate(
      req.query.from as string,
      req.query.to as string
    );
    const spendings: Array<MonthResponse> = await aggregateByMonth(
      id,
      start,
      end
    );
    const budget = await loadMonthBudjet(id);
    const budgets = new Array(spendings.length).fill(budget);
    return res.send({
      message: "successful",
      data: {
        spendings: spendings,
        budgets: budgets,
      },
      from: start,
      to: end,
    });
  } catch {
    return res.status(400).send({
      message: "The given data was invalid",
    });
  }
};

export const latest = async (req: express.Request, res: express.Response) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 6;
    const response = await loadLatestSpendings(limit);
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
