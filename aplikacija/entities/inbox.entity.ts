import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uq_inbox_name", ["name"], { unique: true })
@Entity("inbox")
export class Inbox {
  @PrimaryGeneratedColumn({ type: "int", name: "inbox_id", unsigned: true })
  inboxId: number;

  @Column({ type: "varchar", name: "name", unique: true, length: 50 })
  name: string;

  @Column( { type: "varchar",name: "mail", length: 128 })
  mail: string;

  @Column( {type: "text", name: "message" })
  message: string;
}
