import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Admin } from "./admin.entity";
import { Product } from "./product.entity";
import * as Validator from 'class-validator';


@Index("fk_category_parent__category_id", ["parentCategoryId"], {})
@Entity("category")
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "category_id", unsigned: true })
  categoryId: number;

  @Column({type: "varchar", name: "name", length: 50})
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(0,50)
  name: string;

  @Column( {type: "varchar",name: "image_path", length: 255})
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(0,255)
  imagePath: string;

  @Column( {
    type: "int",
    name: "parent__category_id",
    nullable: true,
    unsigned: true
  })
  parentCategoryId: number | null;

  @ManyToOne(() => Category, (category) => category.categories, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "parent__category_id", referencedColumnName: "categoryId" },
  ])
  parentCategory: Category;

  @OneToMany(() => Category, (category) => category.parentCategory)
  categories: Category[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
