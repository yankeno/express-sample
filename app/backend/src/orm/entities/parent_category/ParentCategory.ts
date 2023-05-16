import { Column, Entity, OneToMany } from "typeorm";
import { Category } from "../category/Category";
import { BaseEntity } from "../abstracts/BaseEntity";

@Entity("parent_categories")
export class ParentCategory extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Category, (category) => category.parentCategory)
  categories: Category[];
}
