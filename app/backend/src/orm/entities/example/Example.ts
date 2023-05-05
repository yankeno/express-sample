import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("examples")
export class Example {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  description: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;
}
