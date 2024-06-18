import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema, DefaultSchema } from 'base';
import { Document, Types } from 'mongoose';

export type ResourceDocument = Resource & Document;

@DefaultSchema()
export class Resource extends BaseSchema {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop({
    type: String,
    required: true,
  })
  banner: string;

  @Prop({
    ref: 'User',
    type: Types.ObjectId,
    autopopulate: true,
  })
  user: Types.ObjectId;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
ResourceSchema.plugin(require('mongoose-autopopulate'));
