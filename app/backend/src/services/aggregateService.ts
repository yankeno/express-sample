import moment from "moment";
import { dataSource } from "../orm/config/ormconfig";
import { Spending } from "../orm/entities/spending/Spending";
import { constDate } from "../constants/date";
import { loadBeginningOfMonth, loadToday } from "../helpers/dateHelper";

const repo = dataSource.getRepository(Spending);

export const aggregateByCategory = async (
  id: number,
  start: string,
  end: string
) => {
  return await repo
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
  const result = await repo
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

export const aggregateByWeek = async (
  id: number,
  start: string,
  end: string
) => {
  const result = await repo
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

export const aggregateByMonth = async (
  id: number,
  start: string,
  end: string
) => {
  const result = await repo
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

export const loadLatestSpendings = async (limit: number) => {
  return await repo.find({
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
    ? moment(from as any).format(constDate.DefaultFormat)
    : loadToday();
  return { start, end };
};
