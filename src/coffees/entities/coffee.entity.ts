import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Coffee extends Document {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop({ default: 0 })
  recommendations: number;

  @Prop()
  brand: string;

  @Prop([String])
  flavors: string[];
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee);

export const CoffeeEntityModule = MongooseModule.forFeature([
  {
    name: Coffee.name,
    schema: CoffeeSchema,
  },
]);
