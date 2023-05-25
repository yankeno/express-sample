import express from "express";
import { loadCategories } from "../services/categoryService";
import { ParentCategoryResponse } from "../types/category";

export const index = async (req: express.Request, res: express.Response) => {
  try {
    const response: Array<ParentCategoryResponse> = await loadCategories();
    return res.send({
      message: "successful",
      data: response,
    });
  } catch {
    return res.status(400).send({
      message: "Bad request",
    });
  }
};
