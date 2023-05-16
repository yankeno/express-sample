import { Column, Entity, OneToMany } from "typeorm";
import { Budget } from "../budget/Budget";
import { BaseEntity } from "../abstracts/BaseEntity";

@Entity("periods")
export class Period extends BaseEntity {
  @Column()
  period: string;

  @Column()
  period_en: string;

  @OneToMany(() => Budget, (budget) => budget.period)
  budgets: Budget[];
}
