import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesSv: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery) {
    return this.coffeesSv.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.coffeesSv.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: any): void {
    return this.coffeesSv.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: any) {
    return this.coffeesSv.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesSv.remove(id);
  }
}
