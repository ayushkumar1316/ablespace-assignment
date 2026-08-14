import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ trim: true, default: '' })
  email: string;

  @Prop({ default: true })
  isGuest: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
