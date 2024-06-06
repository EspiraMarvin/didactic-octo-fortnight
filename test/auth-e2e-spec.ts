import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { SignInDto, SignUpAgentDto } from 'src/auth/dto';
import mongoose from 'mongoose';
import { database, imports } from './constants';

describe('App e2e', () => {
  let app: INestApplication;
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
    await app.listen(4441);
    pactum.request.setBaseUrl('http://localhost:4441');
  });

  afterAll(async () => {
    await mongoose.disconnect();
    app.close();
  });

  describe('Auth e2e', () => {
    const dto: SignUpAgentDto = {
      name: 'test auth',
      email: 'testauth@gmail.com',
      password: '12345345',
    };

    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup-agent')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup-agent')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if password is less than 6 xcters', () => {
        return pactum
          .spec()
          .post('/auth/signup-agent')
          .withBody({
            email: dto.email,
            password: '233',
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signup-agent').expectStatus(400);
      });
      it(' should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup-agent')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
      it('should signin', () => {
        const signindto: SignInDto = {
          email: 'testauth@gmail.com',
          password: '12345345',
        };
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(signindto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
        //   .inspect();
      });
    });
  });
});
