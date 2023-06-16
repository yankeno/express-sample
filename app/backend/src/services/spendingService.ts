import { dataSource } from "@/orm/config/ormconfig";
import { Spending } from "@/orm/entities/spending/Spending";
import { Like } from "typeorm";
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

export const loadMonthlySpendings = async (
  id: number,
  month: string, // YYYY-MMの形式で渡ってくる
  category_id?: number
) => {
  try {
    let findOption: any = {
      relations: {
        category: {
          parentCategory: true,
        },
      },
      select: {
        id: true,
        date: true,
        price: true,
        description: true,
        comment: true,
      },
      where: {
        user_id: id,
        date: Like(month + "-%"),
      },
      order: {
        date: "ASC",
      },
    };
    if (category_id) {
      findOption.where.category_id = category_id;
    }

    return await repo.find(findOption);
  } catch (error) {
    console.error("Error while getting spending list: ", error);
    throw error;
  }
};
