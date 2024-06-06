import { NewUserDto, UpdateUserDto, UserRole } from 'src/users/dto';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { SignInDto, SignUpAgentDto } from 'src/auth/dto';
import mongoose from 'mongoose';
import { database, imports } from './constants';
import { NewProductDto } from 'src/products/dto';

describe('Products e2e', () => {
  let app: INestApplication;
  let token: string;
  let prId: string;

  beforeAll(async () => {
    await mongoose.connect(database);
    await mongoose.connection.db.dropDatabase();

    const moduleRef = await Test.createTestingModule({
      imports,
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(4443);
    pactum.request.setBaseUrl('http://localhost:4443');

    const dto: NewUserDto = {
      name: 'admin test product',
      email: 'admintestproduct@gmail.com',
      password: 'password',
      role: UserRole['ADMIN'],
    };
    await pactum
      .spec()
      .post('/auth/signup-admin')
      .withBody(dto)
      .expectStatus(201);

    const ndto: SignInDto = {
      email: 'admintestproduct@gmail.com',
      password: 'password',
    };
    // Obtain a Bearer token by logging in
    const loginResponse = await pactum
      .spec()
      .post('/auth/signin')
      .withBody(ndto)
      .expectStatus(200)
      .returns('access_token');

    token = loginResponse;

    const newAdto: NewProductDto = {
      name: 'TV',
      type: 'entertainment',
      price: 1000,
    };
    const pId = await pactum
      .spec()
      .post('/products')
      .withHeaders('Authorization', `Bearer ${token}`)
      .withBody(newAdto)
      .expectStatus(201)
      .returns('_id');

    prId = pId;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    app.close();
  });

  describe('Edit product', () => {
    const dto: UpdateUserDto = {
      name: 'Play station',
    };
    it('should edit product', () => {
      return pactum
        .spec()
        .patch(`/products/${prId}`)
        .withHeaders({
          Authorization: `Bearer ${token}`,
        })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(dto.name);
    });
  });

  describe('Delete user', () => {
    it('should delete user', () => {
      return pactum
        .spec()
        .patch(`/products/${prId}`)
        .withPathParams('id', `${prId}`)
        .withHeaders({
          Authorization: `Bearer ${token}`,
        })
        .withBody(prId)
        .expectStatus(200);
    });
  });

  describe('Get me', () => {
    it('should get current product', () => {
      return pactum
        .spec()
        .get('/products')
        .withHeaders({
          Authorization: `Bearer ${token}`,
        })
        .expectStatus(200);
    });
  });

  describe('Get products', () => {
    it('should get a product', () => {
      return pactum
        .spec()
        .get('/products')
        .withHeaders({
          Authorization: `Bearer ${token}`,
        })
        .expectStatus(200);
      // .expectJsonLength(1);
      // .inspect();
    });
  });
});
