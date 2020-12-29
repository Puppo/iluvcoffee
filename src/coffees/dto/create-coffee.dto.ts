import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of the coffee' })
  @IsString()
  readonly name: string;
  @ApiProperty({ description: 'The brand of the coffee' })
  @IsString()
  readonly brand: string;
  @ApiProperty()
  @IsString({ each: true })
  readonly flavors: string[];
}
