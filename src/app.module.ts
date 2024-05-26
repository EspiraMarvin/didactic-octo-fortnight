import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserSchema } from './schemas/user.schema';
import { ProductsModule } from './products/products.module';
import { ProductSchema } from './schemas/product.schema';
import { CommissionSchema } from './schemas/commission.schema';
import { UsersSeedService } from './users/seeders/users.seeder.service';
import { ProductsSeedService } from './products/seeders/products.seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Commission', schema: CommissionSchema },
      { name: 'Product', schema: ProductSchema },
    ]),
    AuthModule,
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersSeedService, ProductsSeedService],
})
export class AppModule {}
