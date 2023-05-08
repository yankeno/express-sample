import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../user/User";
import { Period } from "../period/Period";
import { BaseEntity } from "../abstracts/BaseEntity";

@Entity("budgets")
@Index(["user_id", "period_id"], { unique: true })
export class Budget extends BaseEntity {
  @Column()
  user_id: number;

  @Column()
  period_id: number;

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
