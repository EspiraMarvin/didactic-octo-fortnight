import 'dotenv/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule} from '../src/users/users.module'
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { User } from '../src/schemas/user.schema';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from 'src/products/products.module';
import { Product } from 'src/schemas/product.schema';

export const database = process.env.DATABASE_URI_TEST;

export const imports = [MongooseModule.forRoot(database),  ConfigModule , JwtModule ,AuthModule, UsersModule,  User, ProductsModule, Product];

