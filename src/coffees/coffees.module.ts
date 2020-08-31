import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from '../events/entities/event.entity';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { CoffeeEntity } from './entities/coffee.entity';
import { FlavorEntity } from './entities/flavor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoffeeEntity, FlavorEntity, EventEntity]),
  ],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
