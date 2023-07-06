import { dataSource } from "../orm/config/ormconfig";
import { Budget } from "~/orm/entities/budget/Budget";
import { Period } from "~/orm/entities/period/Period";

const budgetRepo = dataSource.getRepository(Budget);
const periodRepo = dataSource.getRepository(Period);

export const loadAllBudgets = async (id: number) => {
  const budgets = await budgetRepo.find({
    select: {
      period_id: true,
      amount: true,
    },
    where: {
      user_id: id,
    },
  });
  const periods = await periodRepo.find({
    select: {
      id: true,
      period: true,
      period_en: true,
    },
  });
  return periods.map((v) => {
    return {
      id: v.id,
      period: v.period,
      period_en: v.period_en,
      amount: budgets.find((item) => item.period_id === v.id)?.amount ?? 0,
    };
  });
};

export const upsertBudgets = async (budgets: Array<Budget>) => {
  try {
    await dataSource.transaction(async (transactionEntityManager) => {
      await Promise.all(
        budgets.map((budget) => {
          return transactionEntityManager.save(budget);
        })
      );
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};
