import { IsEnum, IsOptional } from 'class-validator';
import { COLOR_MODES, THEME_MODES } from '../preference.schema';

export class UpdatePreferencesDto {
  @IsOptional()
  @IsEnum(THEME_MODES)
  theme?: (typeof THEME_MODES)[number];

  @IsOptional()
  @IsEnum(COLOR_MODES)
  colorMode?: (typeof COLOR_MODES)[number];
}
