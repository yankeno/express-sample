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

export const loadMonthlySpendings = async (
  id: number,
  month: string // YYYY-MMの形式で渡ってくる
) => {
  try {
    const spendings = await repo
      .createQueryBuilder("spendings")
      .innerJoinAndSelect("spendings.category", "category")
      .innerJoinAndSelect("category.parentCategory", "parent_category")
      .select([
        "spendings.id",
        "spendings.date",
        "spendings.price",
        "spendings.description",
        "spendings.comment",
      ])
      .addSelect("category.id", "category_id")
      .addSelect("category.name", "category_name")
      .addSelect("category.parent_category_id", "parent_category_id")
      .addSelect("parent_category.id", "parent_category_id")
      .addSelect("parent_category.name", "parent_category_name")
      .where("spendings.user_id = :userId", { userId: id })
      .andWhere("spendings.date LIKE :date", { date: `${month}-%` })
      .orderBy("spendings.date", "ASC")
      .getMany();
    return spendings.map((spending) => {
      return {
        id: spending.id,
        price: spending.price,
        date: spending.date,
        description: spending.description,
        comment: spending.comment,
        category_id: spending.category.id,
        category_name: spending.category.name,
        parent_category_id: spending.category.parentCategory.id,
        parent_category_name: spending.category.parentCategory.name,
      };
    });
  } catch (error) {
    console.error("Error while getting spending list: ", error);
    throw error;
  }
};
