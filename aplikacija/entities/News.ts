import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Admin } from "./Admin";

@Index("fk_news_admin_id", ["adminId"], {})
@Entity("news", { schema: "aplikacija" })
export class News {
  @PrimaryGeneratedColumn({ type: "int", name: "news_id", unsigned: true })
  newsId: number;

  @Column("int", { name: "caption", default: () => "'0'" })
  caption: number;

  @Column("text", { name: "text" })
  text: string;

  @Column("varchar", { name: "picture", length: 128 })
  picture: string;

  @Column("int", { name: "admin_id", unsigned: true, default: () => "'0'" })
  adminId: number;

  @ManyToOne(() => Admin, (admin) => admin.news, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "admin_id", referencedColumnName: "adminId" }])
  admin: Admin;
}
