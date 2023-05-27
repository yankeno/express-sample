export type Category = {
  id: number;
  name: string;
  parent_category_id: number;
};

export type ParentCategory = {
  id: number;
  name: string;
  categories: Category[];
};
