import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './interfaces/product.interface';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsDataService {
  private products: Array<Product> = [];

  addProduct(newProduct: CreateProductDto): Product {
    newProduct.id = uuidv4();
    newProduct.createdAt = new Date();
    newProduct.updatedAt = new Date();
    this.products.push(newProduct);
    return newProduct;
  }

  deleteProduct(id: string): void {
    const deletedItem = this.getProductById(id);
    const index = this.products.indexOf(deletedItem);
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }

  updateProduct(id: string, dto: UpdateProductDto): Product {
    this.products = this.products.map((i) => {
      if (i.id === id) {
        return {
          ...dto,
          id: i.id,
          createdAt: i.createdAt,
          updatedAt: new Date(),
        };
      }

      return i;
    });

    return this.getProductById(id);
  }

  getProductById(id: string): Product {
    let itemFound = this.products.find((item) => {
      if (item.id === id) return true;
    });
    return itemFound;
  }

  getAllProducts(): Array<Product> {
    return this.products;
  }
}
