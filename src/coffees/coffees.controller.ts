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
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { Public } from '../common/decorators/public.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { CoffeeEntity } from './entities/coffee.entity';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesSv: CoffeesService) {}

  @Public()
  @Get()
  findAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<CoffeeEntity[]> {
    return this.coffeesSv.findAll(paginationQuery);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: string): Promise<CoffeeEntity> {
    return this.coffeesSv.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<CoffeeEntity> {
    return this.coffeesSv.create(createCoffeeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCoffeeDto: Partial<CreateCoffeeDto>,
  ): Promise<CoffeeEntity> {
    return this.coffeesSv.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<CoffeeEntity> {
    return this.coffeesSv.remove(id);
  }
}
