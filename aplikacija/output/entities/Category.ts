import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";

@Index("fk_category_parent__category_id", ["parentCategoryId"], {})
@Entity("category", { schema: "aplikacija" })
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "category_id", unsigned: true })
  categoryId: number;

  @Column("varchar", { name: "name", length: 50, default: () => "'0'" })
  name: string;

  @Column("varchar", { name: "image_path", length: 255, default: () => "'0'" })
  imagePath: string;

  @Column("int", {
    name: "parent__category_id",
    nullable: true,
    unsigned: true,
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
