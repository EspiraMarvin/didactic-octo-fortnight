import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { UsersSeedService } from './users/seeders/users.seeder.service';
import { ValidationPipe } from '@nestjs/common';
import { ProductsSeedService } from './products/seeders/products.seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get<number>('PORT') || 3000);
  /**seed users, commission rate & products to the DB */
  const usersSeedService = app.get(UsersSeedService);
  await usersSeedService.seed();
  await usersSeedService.seedCommission();
  const productsSeedService = app.get(ProductsSeedService);
  await productsSeedService.seed();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
}
bootstrap();
