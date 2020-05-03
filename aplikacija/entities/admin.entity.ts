import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { News } from "./news.entity";
import { type } from "os";

@Index("uq_admin_username", ["username"], { unique: true })
@Entity("admin")
export class Admin {
  @PrimaryGeneratedColumn({ type: "int", name: "admin_id", unsigned: true })
  adminId: number;

  @Column()({

    type: "varchar",
    unique: true,
    length: 32
  })
  username: string;

  @Column("varchar", {
    name: "password_hash",
    length: 128
  })
  passwordHash: string;

  @Column( {type: "varchar", name: "name", length: 128})
  name: string;

  @Column( {type: "varchar", name: "surname", length: 128 })
  surname: string;

  @OneToMany(() => News, (news) => news.admin)
  news: News[];
}
