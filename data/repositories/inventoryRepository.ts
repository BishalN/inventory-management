import { Connection, Repository } from "typeorm";
import { InventoryModal } from "../entities/inventory";

interface ICreateInventoryData {
  quantity: number;
  location: string;
}

export class InventoryRepository {
  private ormRepository: Repository<InventoryModal>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(InventoryModal);
  }

  public async getAll(): Promise<InventoryModal[]> {
    const inventories = await this.ormRepository.find();

    return inventories;
  }

  public async create({
    location,
    quantity,
  }: ICreateInventoryData): Promise<InventoryModal> {
    const inventory = this.ormRepository.create({
      location,
      quantity,
    });

    await this.ormRepository.save(inventory);

    return inventory;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
