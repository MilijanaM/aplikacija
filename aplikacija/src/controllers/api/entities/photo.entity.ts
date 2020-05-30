import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entity";
import * as Validator from 'class-validator';


@Index("fk_photo_product_id", ["productId"], {})
@Entity("photo")
export class Photo {
  @PrimaryGeneratedColumn({ type: "int", name: "photo_id", unsigned: true })
  photoId: number;

  @Column( { type: "varchar",name: "description", length: 255, default: () => "'0'" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(0,255)
  description: string;

  @Column( {type: "varchar", name: "image_path", length: 255, default: () => "'0'" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(0,255)
  imagePath: string;

  @Column( {type: "int", name: "product_id", unsigned: true, default: () => "'0'" })
  productId: number;

  @ManyToOne(() => Product, (product) => product.photos, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "productId" }])
  product: Product;
}
