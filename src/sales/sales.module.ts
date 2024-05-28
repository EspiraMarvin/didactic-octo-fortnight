import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SaleSchema } from 'src/schemas/sale.schema';
import { UserSchema } from 'src/schemas/user.schema';
import { CommissionSchema } from 'src/schemas/commission.schema';
import { ProductSchema } from 'src/schemas/product.schema';
import { AccountSchema } from 'src/schemas/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Sale', schema: SaleSchema },
      { name: 'Commission', schema: CommissionSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'Account', schema: AccountSchema },
    ]),
  ],
  providers: [SalesService],
  controllers: [SalesController],
})
export class SalesModule {}
