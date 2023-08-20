import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";

@Entity("products")
export class ProductModal {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  category: string;

  @Column()
  selling_price: number;

  @Column({ nullable: true })
  cost_price: number;

  // put some default asset paths
  @Column()
  image_url: string;

  @Column()
  bar_code: string;

  @Column()
  qr_code: string;

  @Column()
  stock: number;

  @Column()
  measurement_unit: string;
}
