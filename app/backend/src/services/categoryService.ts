import { dataSource } from "../orm/config/ormconfig";
import { ParentCategory } from "../orm/entities/parent_category/ParentCategory";

const repo = dataSource.getRepository(ParentCategory);

export const loadCategories = async () => {
  const response = await repo.find({
    relations: {
      categories: true,
    },
    order: {
      id: "ASC",
    },
  });
  // 必要なプロパティだけ抽出する
  return response.map((record) => {
    return {
      id: record.id,
      name: record.name,
      categories: record.categories.map((category) => {
        return {
          id: category.id,
          name: category.name,
        };
      }),
    };
  });
};
