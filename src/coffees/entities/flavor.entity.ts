import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CoffeeEntity } from './coffee.entity';

@Entity('flavor')
export class FlavorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    type => CoffeeEntity,
    coffee => coffee.flavors,
  )
  coffees: CoffeeEntity[];
}
