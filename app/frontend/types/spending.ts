export type Spending = {
  id: number;
  date: string;
  price: number;
  description: string;
  comment: string | null;
  category_id: number;
  category_name: string;
  parent_category_id: number;
  parent_category_name: string;
};

export type Category = {};
