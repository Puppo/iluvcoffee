import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop()
  type: string;

  @Prop()
  name: string;

  @Prop({ type: SchemaTypes.Mixed })
  payload: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Event);
EventSchema.index({ name: 1, type: 1 });

export const EventEntityModule = MongooseModule.forFeature([
  {
    name: Event.name,
    schema: EventSchema,
  },
]);
