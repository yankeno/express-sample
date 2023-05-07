import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../user/User";
import { Category } from "../category/Category";
import { BaseEntity } from "../abstracts/BaseEntity";

@Entity("spendings")
export class Spending extends BaseEntity {
  @ManyToOne(() => User, (user) => user.spendings)
  @JoinColumn({
    name: "user_id",
  })
  user: User;

  @ManyToOne(() => Category, (category) => category.spendings)
  @JoinColumn({
    name: "category_id",
  })
  category: Category;

  @Column({ unsigned: true })
  price: number;

  @Column({ nullable: true })
  comment: string;
}
