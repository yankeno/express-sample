import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Spending } from "../spending/Spending";
import { ParentCategory } from "../parent_category/ParentCategory";
import { MasterEntity } from "../abstracts/MasterEntity";

@Entity("categories")
export class Category extends MasterEntity {
  @Column()
  name: string;

  @OneToMany(() => Spending, (spending) => spending.category)
  spendings: Spending[];

  @ManyToOne(
    () => ParentCategory,
    (parentCategory) => parentCategory.categories
  )
  @JoinColumn({
    name: "parent_category_id",
  })
  parentCategory: ParentCategory;
}
