import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { CoffeeEntityModule } from './entities/coffee.entity';
import { EventEntityModule } from 'src/events/entities/event.entity';

@Module({
  imports: [CoffeeEntityModule, EventEntityModule],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
