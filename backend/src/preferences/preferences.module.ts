import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Preference, PreferenceSchema } from './preference.schema';
import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Preference.name, schema: PreferenceSchema },
    ]),
  ],
  controllers: [PreferencesController],
  providers: [PreferencesService],
})
export class PreferencesModule {}
