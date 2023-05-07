import { Column, Entity, OneToMany } from "typeorm";
import { Category } from "../category/Category";
import { MasterEntity } from "../abstracts/MasterEntity";

@Entity("parent_categories")
export class ParentCategory extends MasterEntity {
  @Column()
  name: string;

  @OneToMany(() => Category, (category) => category.parentCategory)
  categories: Category[];
}
