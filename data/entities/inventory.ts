import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { ProductModal } from "./product";

@Entity("inventories")
export class InventoryModal {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  quantity: number;

  @Column()
  location: string;

  @OneToOne(() => ProductModal)
  @JoinColumn()
  product: ProductModal;
}
