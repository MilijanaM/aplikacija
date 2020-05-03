import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uq_gallery_image_path", ["imagePath"], { unique: true })
@Entity("gallery")
export class Gallery {
  @PrimaryGeneratedColumn({ 
    type: "int",
     name: "gallery_id",
      unsigned: true })
  galleryId: number;

  @Column( {type: "varchar", name: "image_path", unique: true, length: 128 })
  imagePath: string;

  @Column( { type: "varchar",name: "description", length: 128 })
  description: string;

  @Column({
    type: "bit", 
    name: "is_visible",
    nullable: true,
    default: () => "'b'1''",
  })
  isVisible: boolean | null;
}
