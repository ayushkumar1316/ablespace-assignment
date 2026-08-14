import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Preference, PreferenceDocument } from './preference.schema';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectModel(Preference.name)
    private readonly preferenceModel: Model<PreferenceDocument>,
  ) {}

  async getForUser(userId: string): Promise<PreferenceDocument> {
    const existing = await this.preferenceModel.findOne({ userId }).exec();
    if (existing) {
      return existing;
    }
    return this.preferenceModel.create({
      userId: new Types.ObjectId(userId),
    });
  }

  async updateForUser(
    userId: string,
    dto: UpdatePreferencesDto,
  ): Promise<PreferenceDocument> {
    const updated = await this.preferenceModel
      .findOneAndUpdate(
        { userId },
        { $set: dto },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      )
      .exec();
    return updated;
  }
}
