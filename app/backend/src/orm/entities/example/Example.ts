import { Column, Entity } from "typeorm";
import { MasterEntity } from "../abstracts/MasterEntity";

@Entity("examples")
export class Example extends MasterEntity {
  @Column({
    length: 100,
  })
  description: string;
}
