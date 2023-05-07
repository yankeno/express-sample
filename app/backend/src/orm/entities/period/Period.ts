import { Column, Entity, OneToMany } from "typeorm";
import { Budget } from "../budget/Budget";
import { MasterEntity } from "../abstracts/MasterEntity";

@Entity("periods")
export class Period extends MasterEntity {
  @Column()
  period: string;

  @OneToMany(() => Budget, (budget) => budget.period)
  budgets: Budget[];
}
