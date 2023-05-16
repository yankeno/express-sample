import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Spending } from "../spending/Spending";
import { ParentCategory } from "../parent_category/ParentCategory";
import { BaseEntity } from "../abstracts/BaseEntity";

@Entity("categories")
export class Category extends BaseEntity {
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
