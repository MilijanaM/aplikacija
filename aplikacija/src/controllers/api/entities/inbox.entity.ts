import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import * as Validator from 'class-validator';


@Index("uq_inbox_name", ["name"], { unique: true })
@Entity("inbox")
export class Inbox {
  @PrimaryGeneratedColumn({ type: "int", name: "inbox_id", unsigned: true })
  inboxId: number;

  @Column({ type: "varchar", name: "name", unique: true, length: 50 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(0,50)
  name: string;

  @Column( { type: "varchar",name: "mail", length: 128 })
  @Validator.IsNotEmpty()
  @Validator.IsEmail({
    allow_ip_domain: false,
    allow_utf8_local_part: true,
    require_tld: true,
  })
  mail: string;

  @Column( {type: "text", name: "message" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  message: string;
}
