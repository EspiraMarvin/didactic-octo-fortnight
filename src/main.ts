import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { UsersSeedService } from './users/seeders/users.seeder.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  await app.listen(configService.get<string>('PORT'));
  const usersSeedService = app.get(UsersSeedService);
  await usersSeedService.seed();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
}
bootstrap();