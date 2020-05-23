import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entity";

@Index("fk_product_price_product_id", ["productId"], {})
@Entity("product_price")
export class ProductPrice {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "product_price_id",
    unsigned: true,
  })
  productPriceId: number;

  @Column( {
    type:"decimal",
    name: "price",
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  price: number;

  @Column( { 
    type: "timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column( {type: "int",name: "product_id", unsigned: true })
  productId: number;

  @ManyToOne(() => Product, (product) => product.productPrices, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "productId" }])
  product: Product;
}
