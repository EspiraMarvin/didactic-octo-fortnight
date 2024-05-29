import { Module } from '@nestjs/common';
import { TaskSchedulerService } from './task-scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { SaleSchema } from 'src/schemas/sale.schema';
import { ProductSchema } from 'src/schemas/product.schema';
import { CommissionSchema } from 'src/schemas/commission.schema';
import { AccountSchema } from 'src/schemas/account.schema';

@Module({
  providers: [TaskSchedulerService],
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Sale', schema: SaleSchema },
      { name: 'Commission', schema: CommissionSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'Account', schema: AccountSchema },
    ]),
  ],
})
export class TaskSchedulerModule {}
