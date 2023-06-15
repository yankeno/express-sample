import { FindManyOptions, FindOperator } from "typeorm";
import { Spending } from "~/orm/entities/spending/Spending";

export type CreateRequest = {
  user_id: number;
  category_id: number;
  date: string;
  price: number;
  description?: string;
  comment?: string;
};
