import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../user/User";
import { Period } from "../period/Period";
import { BaseEntity } from "../abstracts/BaseEntity";

@Entity("budgets")
export class Budget extends BaseEntity {
  @ManyToOne(() => User, (user) => user.budgets)
  @JoinColumn({
    name: "user_id",
  })
  user: User;

  @ManyToOne(() => Period, (period) => period.budgets)
  @JoinColumn({
    name: "period_id",
  })
  period: Period;

  @Column()
  amount: number;
}
