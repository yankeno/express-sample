import moment from "moment";
import { dataSource } from "@/orm/config/ormconfig";
import { Spending } from "@/orm/entities/spending/Spending";
import { constDate } from "@/constants/date";
import { loadBeginningOfMonth, loadToday } from "../helpers/dateHelper";
import { Budget } from "~/orm/entities/budget/Budget";
import { periods } from "~/constants/budget";

const spendingRepository = dataSource.getRepository(Spending);
const budjetRepository = dataSource.getRepository(Budget);

export const aggregateByCategory = async (
  id: number,
  start: string,
  end: string
) => {
  return await spendingRepository
    .createQueryBuilder("spendings")
    .select([
      "parentCategory.name AS parent_category_name",
      "SUM(spendings.price) AS amount",
    ])
    .innerJoin("spendings.user", "user")
    .innerJoin("spendings.category", "category")
    .innerJoin("category.parentCategory", "parentCategory")
    .where("date BETWEEN :start AND :end", { start: start, end: end })
    .andWhere("user.id = :userId", { userId: id })
    .groupBy("parentCategory.id")
    .orderBy("SUM(spendings.price)", "DESC")
    .getRawMany();
};

export const aggregateByDate = async (
  id: number,
  start: string,
  end: string
) => {
  const result = await spendingRepository
    .createQueryBuilder("spendings")
    .select(["date", "SUM(spendings.price) AS amount"])
    .innerJoin("spendings.user", "user")
    .where("date BETWEEN :start AND :end", { start: start, end: end })
    .andWhere("user.id = :userId", { userId: id })
    .groupBy("date")
    .orderBy("date")
    .getRawMany();
  // 日付を YYYY-MM-DD の形式に変更
  return result.map((record) => {
    return {
      date: moment(record.date).format(constDate.Date),
      amount: record.amount,
    };
  });
};

export const loadDateBudjet = async (id: number) => {
  const budget = await budjetRepository.findOne({
    relations: {
      period: true,
    },
    where: {
      user_id: id,
      period: {
        period_en: periods.OneDay,
      },
    },
  });
  return budget?.amount;
};

export const aggregateByWeek = async (
  id: number,
  start: string,
  end: string
) => {
  const result = await spendingRepository
    .createQueryBuilder("spendings")
    .select([
      "SUBDATE(date, WEEKDAY(date)) as week",
      "SUM(spendings.price) AS amount",
    ])
    .innerJoin("spendings.user", "user")
    .where("date BETWEEN :start AND :end", { start: start, end: end })
    .andWhere("user.id = :userId", { userId: id })
    .groupBy("week")
    .orderBy("week")
    .getRawMany();
  // 日付を YYYY-MM-DD の形式に変更
  return result.map((record) => {
    return {
      date: moment(record.week).format(constDate.Date),
      amount: record.amount,
    };
  });
};

export const loadWeekBudjet = async (id: number) => {
  const budget = await budjetRepository.findOne({
    relations: {
      period: true,
    },
    where: {
      user_id: id,
      period: {
        period_en: periods.OneWeek,
      },
    },
  });
  return budget?.amount;
};

export const aggregateByMonth = async (
  id: number,
  start: string,
  end: string
) => {
  const result = await spendingRepository
    .createQueryBuilder("spendings")
    .select([
      "DATE_FORMAT(date, '%Y-%m') as month",
      "SUM(spendings.price) AS amount",
    ])
    .innerJoin("spendings.user", "user")
    .where("date BETWEEN :start AND :end", { start: start, end: end })
    .andWhere("user.id = :userId", { userId: id })
    .groupBy("month")
    .orderBy("month")
    .getRawMany();
  // 日付を YYYY-MM-DD の形式に変更
  return result.map((record) => {
    return {
      date: moment(record.month).format(constDate.Date),
      amount: record.amount,
    };
  });
};

export const loadMonthBudjet = async (id: number) => {
  const budget = await budjetRepository.findOne({
    relations: {
      period: true,
    },
    where: {
      user_id: id,
      period: {
        period_en: periods.OneMonth,
      },
    },
  });
  return budget?.amount;
};

export const loadLatestSpendings = async (limit: number) => {
  return await spendingRepository.find({
    select: {
      id: true,
      date: true,
      category_id: true,
      price: true,
      description: true,
    },
    order: {
      date: "DESC",
    },
    take: limit,
  });
};

export const convertDate = (from: string, to: string) => {
  const start: string = from
    ? moment(from as any).format(constDate.DefaultFormat)
    : loadBeginningOfMonth();
  const end: string = to
    ? moment(to as any).format(constDate.DefaultFormat)
    : loadToday();

  const startDate = new Date(start);
  const endDate = new Date(end);

  // 日付の大小が反転していたら正しい順序に並び替える
  return startDate <= endDate
    ? { start: start, end: end }
    : { start: end, end: start };
};
