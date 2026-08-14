import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { CurrentUser } from '../common/current-user.decorator';
import type { CurrentUserData } from '../common/current-user.decorator';

@Controller('preferences')
@UseGuards(JwtAuthGuard)
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Get('me')
  getMe(@CurrentUser() user: CurrentUserData) {
    return this.preferencesService.getForUser(user.id);
  }

  @Patch('me')
  updateMe(
    @CurrentUser() user: CurrentUserData,
    @Body() dto: UpdatePreferencesDto,
  ) {
    return this.preferencesService.updateForUser(user.id, dto);
  }
}
