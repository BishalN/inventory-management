import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { InventoryModal } from "./inventory";

@Entity("products")
export class ProductModal {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  price: number;

  @Column()
  image_url: string;

  @OneToOne(() => InventoryModal, (inventory) => inventory.product)
  inventory: InventoryModal;
}
