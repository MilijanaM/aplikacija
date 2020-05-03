import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";

@Index("fk_product_price_product_id", ["productId"], {})
@Entity("product_price", { schema: "aplikacija" })
export class ProductPrice {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "product_price_id",
    unsigned: true,
  })
  productPriceId: number;

  @Column("decimal", {
    name: "price",
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  price: string;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("int", { name: "product_id", unsigned: true, default: () => "'0'" })
  productId: number;

  @ManyToOne(() => Product, (product) => product.productPrices, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "productId" }])
  product: Product;
}
