import moment from "moment";
import { constDate } from "../constants/date";

export const loadBeginningOfMonth = () => {
  const m = moment();
  return m.startOf("month").format(constDate.DefaultFormat);
};

export const loadToday = () => {
  const m = moment();
  return m.format(constDate.DefaultFormat);
};
