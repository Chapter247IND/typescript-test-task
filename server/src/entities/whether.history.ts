import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { SimpleColumnType } from "typeorm/driver/types/ColumnTypes";

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
