import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { NewProductDto, UpdateProductDto } from './dto/index';
import { AdminGuard } from 'src/auth/guards';

@UseGuards(AdminGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  /** get all products */
  @Get()
  getProducts() {
    try {
      return this.service.getProducts();
    } catch (err) {
      throw new Error(err);
    }
  }

  /** get product by id*/
  @Get(':id')
  getProduct(@Param('id') userId: string) {
    try {
      return this.service.getProduct(userId);
    } catch (err) {
      throw new Error(err);
    }
  }

  /** update product */
  @Patch(':id')
  updateProduct(
    @Param('id') userId: string,
    @Body(new ValidationPipe()) body: UpdateProductDto,
  ) {
    try {
      return this.service.updateProduct(userId, body);
    } catch (err) {
      //   throw err;
      throw new Error(err);
    }
  }

  /**
   * delete product
   */
  @Delete(':id')
  deleteProduct(@Param('id') productId: string) {
    try {
      return this.service.deleteProduct(productId);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * create a new user
   */
  @Post()
  createProduct(@Body(new ValidationPipe()) body: NewProductDto) {
    try {
      return this.service.createProduct(body);
    } catch (err) {
      throw new Error(err);
    }
  }
}
