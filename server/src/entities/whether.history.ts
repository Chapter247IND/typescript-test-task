import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "whether_history" })
class WhetherHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 150,
  })
  city: string;

  @Column({
    length: 150,
    nullable: true,
  })
  country: string;

  @Column({
    nullable: true,
    type: "longtext",
  })
  details: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
export default WhetherHistory;
