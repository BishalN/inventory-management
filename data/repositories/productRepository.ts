import { Connection, Repository } from "typeorm";
import { ProductModal } from "../entities/product";

interface ICreateProductData {
  name: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
}

export class ProductRepository {
  private ormRepository: Repository<ProductModal>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(ProductModal);
  }

  public async getAll(): Promise<ProductModal[]> {
    const products = await this.ormRepository.find();

    return products;
  }

  public async create({
    category,
    description,
    image_url,
    name,
    price,
  }: ICreateProductData): Promise<ProductModal> {
    const product = this.ormRepository.create({
      category,
      description,
      name,
      price,
      image_url,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
