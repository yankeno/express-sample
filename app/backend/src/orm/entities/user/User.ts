import bcrypt from "bcrypt";
import { Entity, Column, OneToMany, BeforeInsert } from "typeorm";
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

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async checkPassword(unencryptedPassword: string) {
    return await bcrypt.compare(unencryptedPassword, this.password);
  }

  @OneToMany(() => Spending, (spending) => spending.user)
  spendings: Spending[];

  @OneToMany(() => Budget, (budget) => budget.period)
  budgets: Budget[];
}
