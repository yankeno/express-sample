import { Column, DeleteDateColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";

export abstract class MasterEntity extends BaseEntity {
  @Column()
  @DeleteDateColumn()
  deleted_at: Date;
}
