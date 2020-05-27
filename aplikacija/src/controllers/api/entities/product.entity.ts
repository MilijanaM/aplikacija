import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Photo } from "./photo.entity";
import { Category } from "./category.entity";
import { ProductPrice } from "./product-price.entity";

@Index("fk_product_category_id", ["categoryId"], {})
@Entity("product")
export class Product {
  @PrimaryGeneratedColumn({ type: "int", name: "product_id", unsigned: true 
})
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
