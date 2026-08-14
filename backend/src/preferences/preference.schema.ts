import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PreferenceDocument = HydratedDocument<Preference>;

export type ThemeMode = 'light' | 'dark';
export type ColorMode =
  'amber' | 'blue' | 'pink' | 'rose' | 'emerald' | 'black';

export const THEME_MODES: ThemeMode[] = ['light', 'dark'];
export const COLOR_MODES: ColorMode[] = [
  'amber',
  'blue',
  'pink',
  'rose',
  'emerald',
  'black',
];

@Schema({ timestamps: true })
export class Preference {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ enum: THEME_MODES, default: 'light' })
  theme: ThemeMode;

  @Prop({ enum: COLOR_MODES, default: 'blue' })
  colorMode: ColorMode;
}

export const PreferenceSchema = SchemaFactory.createForClass(Preference);
