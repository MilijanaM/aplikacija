import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";

@Index("fk_photo_product_id", ["productId"], {})
@Entity("photo", { schema: "aplikacija" })
export class Photo {
  @PrimaryGeneratedColumn({ type: "int", name: "photo_id", unsigned: true })
  photoId: number;

  @Column("varchar", { name: "description", length: 255, default: () => "'0'" })
  description: string;

  @Column("varchar", { name: "image_path", length: 255, default: () => "'0'" })
  imagePath: string;

  @Column("int", { name: "product_id", unsigned: true, default: () => "'0'" })
  productId: number;

  @ManyToOne(() => Product, (product) => product.photos, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "productId" }])
  product: Product;
}
