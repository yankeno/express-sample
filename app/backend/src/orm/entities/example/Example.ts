import { Column, Entity } from "typeorm";
import { BaseEntity } from "../abstracts/BaseEntity";

@Entity("examples")
export class Example extends BaseEntity {
  @Column({
    length: 100,
  })
  description: string;
}
