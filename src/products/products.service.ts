import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { NewProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
  ) {}

  /**
   * get products
   * @returns
   */
  async getProducts(): Promise<Product[]> {
    try {
      const products: any[] = await this.ProductModel.find({}).lean();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * get a single product
   * @returns product
   */
  async getProduct(productId: string): Promise<Product> {
    const product = await this.ProductModel.findById(productId).lean();

    if (!product) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'product not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    this.logger.log(`product found ${product}`);

    return product;
  }

  /**
   * updates product
   * @param productId
   * @param body
   * @returns
   */
  async updateProduct(productId: string, body: UpdateProductDto) {
    const product = await this.ProductModel.findById(productId).lean();

    if (!product) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'product not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const updateproduct = await this.ProductModel.findByIdAndUpdate(
      productId,
      body,
      {
        new: true,
      },
    );

    this.logger.log(`product updated ${product}`);

    return updateproduct;
  }

  /**
   * deletes product
   * @param productId
   * @returns product
   */
  async deleteProduct(productId: string) {
    const product = await this.ProductModel.findById(productId).lean();
    if (!product) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'product not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const deleteProduct = await this.ProductModel.findByIdAndDelete(productId);
    this.logger.log(`product deleted ${product}`);

    return deleteProduct;
  }

  /**
   *  create product
   * @param body
   * @returns
   */
  async createProduct(body: NewProductDto) {
    const newproduct = new this.ProductModel(body);
    await newproduct.save();

    return newproduct;
  }
}
