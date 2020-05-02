import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn({ name: 'admin_id', type: 'int', unsigned: true})
    adminId: number;

    @Column({ type: 'varchar', length:'32', unique: true})
    username: string;

    @Column({ name: 'password_hash', type: 'varchar', length:'128'})
    passwordHash: string;
     
    @Column({ name: 'name', type: 'varchar', length:'128'})
    name: string;

    @Column({ name: 'surname', type: 'varchar', length:'128'})
    surname: string;

}

