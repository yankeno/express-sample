export type CreateRequest = {
  user_id: number;
  category_id: number;
  date: string;
  price: number;
  description: string;
  comment?: string;
};
