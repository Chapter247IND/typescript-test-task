import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "flights" })
class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
  })
  name: string;

  @Column({
    type: "enum",
    enum: ["SCHEDULED", "IN-FLIGHT", "CANCELLED"],
  })
  status: string;

  @Column({
    type: "datetime",
  })
  scheduledAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
export default Flight;
