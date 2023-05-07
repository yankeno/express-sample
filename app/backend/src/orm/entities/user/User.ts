import bcrypt from "bcrypt";
import { Entity, Column, OneToMany } from "typeorm";
import { Spending } from "../spending/Spending";
import { Budget } from "../budget/Budget";
import { BaseEntity } from "../abstracts/BaseEntity";

@Entity("users")
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Spending, (spending) => spending.user)
  spendings: Spending[];

  @OneToMany(() => Budget, (budget) => budget.period)
  budgets: Budget[];

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfPasswordMatch(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
