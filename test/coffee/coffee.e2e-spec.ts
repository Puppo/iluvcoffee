import { Test, TestingModule } from '@nestjs/testing';
import {
  HttpServer,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CreateCoffeeDto } from '../../src/coffees/dto/create-coffee.dto';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import envRegister from '../utils/env.utils';
import { UpdateCoffeeDto } from '../../src/coffees/dto/update-coffee.dto';

describe('[Feature] Coffees - /coffees', () => {
  let app: INestApplication;
  let httpServer: HttpServer;

  const coffee: CreateCoffeeDto = {
    name: 'Shipwreck Roast',
    brand: 'Buddy Brew',
    flavors: ['chocolate', 'vanilla'],
  };
  const updateCoffeeDto: UpdateCoffeeDto = {
    ...coffee,
    name: 'New and Improved Shipwreck Roast',
  };
  const expectedPartialCoffee = jasmine.objectContaining({
    ...coffee,
    flavors: jasmine.arrayContaining(
      coffee.flavors.map(name => jasmine.objectContaining({ name })),
    ),
  });
  const expectedPartialUpdateCoffee = jasmine.objectContaining({
    ...coffee,
    ...updateCoffeeDto,
    flavors: jasmine.arrayContaining(
      coffee.flavors.map(name => jasmine.objectContaining({ name })),
    ),
  });

  beforeEach(async () => {
    envRegister();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            autoLoadEntities: true,
            synchronize: true,
          }),
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    await app.close();
  });

  it('Create [POST /]', () => {
    return request(httpServer)
      .post('/coffees')
      .send(coffee)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialCoffee);
      });
  });
  it('Get All [GET /]', () => {
    return request(httpServer)
      .get('/coffees')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body.length).toBeGreaterThan(0);
        expect(body[0]).toEqual(expectedPartialCoffee);
      });
  });
  it('Get one [GET /:id]', () => {
    return request(httpServer)
      .get('/coffees/1')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialCoffee);
      });
  });
  it('Update one [PATCH /:id]', () => {
    return request(httpServer)
      .patch('/coffees/1')
      .send(updateCoffeeDto)
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialUpdateCoffee);

        return request(httpServer)
          .get('/coffees/1')
          .then(({ body }) => {
            expect(body).toEqual(expectedPartialUpdateCoffee);
          });
      });
  });
  it('Delete one [DELETE /:id]', () => {
    return request(httpServer)
      .delete('/coffees/1')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialUpdateCoffee);

        return request(httpServer)
          .get('/coffees/1')
          .expect(HttpStatus.NOT_FOUND);
      });
  });
});
