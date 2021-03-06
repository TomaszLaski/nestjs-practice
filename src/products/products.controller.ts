import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  HttpCode,
  Put,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { CreateProductDto } from './dto/create-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './interfaces/product.interface';
import { ProductsDataService } from './products-data.service';

@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {}

  @Post()
  // @UseGuards(RoleGuard)
  addProduct(@Body() item: CreateProductDto): ExternalProductDto {
    return this.mapProductToExternal(this.productRepository.addProduct(item));
  }

  mapProductToExternal(product: Product): ExternalProductDto {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
    };
  }

  @Get(':id')
  getProductById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): ExternalProductDto {
    return this.mapProductToExternal(this.productRepository.getProductById(id));
  }

  @Get()
  getAllProducts(): Array<Product> {
    return this.productRepository.getAllProducts();
  }

  @Delete(':id')
  @HttpCode(204)
  deleteProduct(@Param('id') id): void {
    return this.productRepository.deleteProduct(id);
  }

  @Put(':id')
  updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() product: UpdateProductDto,
  ): ExternalProductDto {
    return this.mapProductToExternal(
      this.productRepository.updateProduct(id, product),
    );
  }
}
