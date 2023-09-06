export type BudgetResponse = {
  id?: number;
  amount: number;
  period: string;
  period_en: string;
  created_at: Date;
  updated_at: Date;
};

export type BudgetRequest = {
  id: Number | undefined;
  user_id: Number | unknown;
  period_id: Number;
  amount: Number;
};
