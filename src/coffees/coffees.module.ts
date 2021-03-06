import { Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { EventEntity } from '../events/entities/event.entity';

import coffeesConfig from './config/coffee.config';

import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { CoffeeEntity } from './entities/coffee.entity';
import { FlavorEntity } from './entities/flavor.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { Connection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoffeeEntity, FlavorEntity, EventEntity]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useFactory: async (connection: Connection): Promise<string[]> => {
        const coffeeBrands = await Promise.resolve(['nestcaffe', 'lavazza']);
        console.log('[!] Async Provider');
        return coffeeBrands;
      },
      inject: [Connection],
      scope: Scope.TRANSIENT,
    },
  ],
})
export class CoffeesModule {}
