import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('event')
// @Index(['type', 'name']) <-- Multiple columns
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  // @Index() <-- Single column
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
