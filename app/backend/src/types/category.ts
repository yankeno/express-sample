export type CategoryResponse = {
  id: number;
  name: string;
};

export type ParentCategoryResponse = {
  id: number;
  name: string;
  categories: Array<CategoryResponse>;
};
