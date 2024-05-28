import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';

@Injectable()
export class ProductsSeedService {
  private readonly logger = new Logger(ProductsSeedService.name);

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async seed() {
    /** get the first 2 products from the db  */
    const productsExists = await this.productModel
      .find({})
      .sort({ _id: 1 })
      .limit(2)
      .exec();

    if (productsExists.length > 0)
      return this.logger.log(`Products seed data in sync ✔`);

    /** data not in db seed the users data */
    const products = [
      {
        name: 'Google Fire Stick',
        type: 'Electronic',
        price: 2000,
      },
      {
        name: 'Brake pad',
        type: 'Automotive',
        price: 5000,
      },
      {
        name: 'Girl with a Pearl Earring',
        type: 'Art',
        price: 10000,
      },
    ];

    const isSeeded = await this.productModel.create(products);

    if (isSeeded) this.logger.log(`Products data seeded successfully`);
  }
}
