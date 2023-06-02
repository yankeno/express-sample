import { dataSource } from "@/orm/config/ormconfig";
import { Spending } from "@/orm/entities/spending/Spending";
import { CreateRequest } from "~/types/spending";

const repo = dataSource.getRepository(Spending);

export const addSpending = async (
  user_id: number,
  category_id: number,
  date: string,
  price: number,
  description?: string,
  comment?: string
) => {
  try {
    let spendingData: CreateRequest = {
      user_id: user_id,
      category_id: category_id,
      date: date,
      price: price,
    };
    if (description) {
      spendingData = { ...spendingData, description: description };
    }
    if (comment) {
      spendingData = { ...spendingData, comment: comment };
    }
    const spending = repo.create(spendingData);
    return await repo.save(spending);
  } catch (error) {
    console.error("Error while adding spending: ", error);
    throw error;
  }
};
