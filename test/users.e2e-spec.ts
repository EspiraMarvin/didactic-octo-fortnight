import { NewUserDto, UpdateUserDto, UserRole } from 'src/users/dto';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { SignInDto, SignUpAgentDto } from 'src/auth/dto';
import mongoose from 'mongoose';
import { database, imports } from './constants';

describe('Users e2e', () => {
  let app: INestApplication;
  let token: string;
  let userId: string;

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
    await app.listen(4445);
    pactum.request.setBaseUrl('http://localhost:4445');

    const dto: NewUserDto = {
      name: 'admin test user',
      email: 'admintest@gmail.com',
      password: 'password',
      role: UserRole['ADMIN'],
    };
    await pactum
      .spec()
      .post('/auth/signup-admin')
      .withBody(dto)
      .expectStatus(201);

    const ndto: SignInDto = {
      email: 'admintest@gmail.com',
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

    // create a user agent
    const newAdto: NewUserDto = {
      name: 'brian auth',
      email: 'brianauth@gmail.com',
      password: '12345345',
      role: UserRole['AGENT'],
    };
    const ruserId = await pactum
      .spec()
      .post('/users')
      .withHeaders('Authorization', `Bearer ${token}`)
      .withBody(newAdto)
      .expectStatus(201)
      .returns('_id');

    userId = ruserId;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    app.close();
  });

  describe('Edit user', () => {
    const dto: UpdateUserDto = {
      name: 'auth brian',
    };
    it('should edit user', () => {
      return pactum
        .spec()
        .patch(`/users/${userId}`)
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
        .patch(`/users/${userId}`)
        .withPathParams('id', `${userId}`)
        .withHeaders({
          Authorization: `Bearer ${token}`,
        })
        .withBody(userId)
        .expectStatus(200);
    });
  });

  describe('Get me', () => {
    it('should get current user', () => {
      return pactum
        .spec()
        .get('/users')
        .withHeaders({
          Authorization: `Bearer ${token}`,
        })
        .expectStatus(200);
    });
  });

  describe('Get users', () => {
    it('should get a user', () => {
      return pactum
        .spec()
        .get('/users')
        .withHeaders({
          Authorization: `Bearer ${token}`,
        })
        .expectStatus(200);
      // .expectJsonLength(1);
      // .inspect();
    });
  });
});
