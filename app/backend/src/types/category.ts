export type CategoryResponse = {
  id: number;
  name: string;
  parent_category_id: number;
};

export type ParentCategoryResponse = {
  id: number;
  name: string;
  categories: Array<CategoryResponse>;
};
