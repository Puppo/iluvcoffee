import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';

@Module({
  imports: [],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
