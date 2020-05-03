import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Photo } from "./Photo";
import { Category } from "./Category";
import { ProductPrice } from "./ProductPrice";

@Index("fk_product_category_id", ["categoryId"], {})
@Entity("product", { schema: "aplikacija" })
export class Product {
  @PrimaryGeneratedColumn({ type: "int", name: "product_id", unsigned: true })
  productId: number;

  @Column("varchar", { name: "name", length: 50, default: () => "'0'" })
  name: string;

  @Column("varchar", { name: "description", length: 255, default: () => "'0'" })
  description: string;

  @Column("int", { name: "category_id", unsigned: true, default: () => "'0'" })
  categoryId: number;

  @OneToMany(() => Photo, (photo) => photo.product)
  photos: Photo[];

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Category;

  @OneToMany(() => ProductPrice, (productPrice) => productPrice.product)
  productPrices: ProductPrice[];
}
