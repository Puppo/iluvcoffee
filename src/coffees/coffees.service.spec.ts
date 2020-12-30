import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesService } from './coffees.service';
import { CoffeeEntity } from './entities/coffee.entity';
import { FlavorEntity } from './entities/flavor.entity';
import coffeesConfig from './config/coffee.config';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

type MockConfigService<T = any> = Partial<
  Record<keyof ConfigService<T>, jest.Mock>
>;
const createMockConfigService = <T = any>(): MockConfigService<T> => ({
  get: jest.fn(),
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(FlavorEntity),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(CoffeeEntity),
          useValue: createMockRepository(),
        },
        {
          provide: ConfigService,
          useValue: createMockConfigService(),
        },
        {
          provide: COFFEE_BRANDS,
          useValue: ['nestcaffe', 'lavazza'],
        },
        {
          provide: coffeesConfig.KEY,
          useValue: () => ({
            foo: 'foo',
          }),
        },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    coffeeRepository = module.get<MockRepository>(
      getRepositoryToken(CoffeeEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should be return the coffee object', async () => {
        const coffeeId = '1';
        const expectedCoffee = {};

        coffeeRepository.findOne.mockReturnValue(expectedCoffee);
        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const coffeeId = '1';
        coffeeRepository.findOne.mockReturnValue(undefined);
        try {
          await service.findOne(coffeeId);
        } catch (ex) {
          expect(ex).toBeInstanceOf(NotFoundException);
          expect(ex.message).toBe(`Coffee #${coffeeId} not found`);
        }
      });
    });
  });
});
