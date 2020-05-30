import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Admin } from "./admin.entity";
import * as Validator from 'class-validator';


@Index("fk_news_admin_id", ["adminId"], {})
@Entity("news")
export class News {
  @PrimaryGeneratedColumn({ type: "int", name: "news_id", unsigned: true })
  newsId: number;

  @Column( {type: "int", name: "caption"})
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces:0,
  })
  caption: number;

  @Column( { type: "text",name: "text" })
  text: string;

  @Column( {type: "varchar", name: "picture", length: 128 })
  picture: string;

  @Column( {type: "int", name: "admin_id", unsigned: true })
  adminId: number;

  @ManyToOne(() => Admin, (admin) => admin.news, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "admin_id", referencedColumnName: "adminId" }])
  admin: Admin;
}
