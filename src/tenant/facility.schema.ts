import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Facility extends Document {
  @Prop()
  address: string;

  @Prop()
  facilityId: string;

  @Prop()
  floors: string[];
}

export const FacilitySchema = SchemaFactory.createForClass(Facility);
