import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get user dashboard data' })
  @ApiResponse({ status: 200, description: 'Dashboard data retrieved' })
  async getDashboard(@Request() req) {
    const user = await this.usersService.findById(req.user.id);
    
    // TODO: Add actual dashboard data (subscriptions, signals, P&L, etc.)
    return {
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        status: user.status,
        created_at: user.created_at,
      },
      subscriptions: [],
      active_signals: [],
      recent_trades: [],
      performance: {
        total_pnl: 0,
        win_rate: 0,
        total_trades: 0,
      },
    };
  }

  @Put('preferences')
  @ApiOperation({ summary: 'Update user preferences' })
  @ApiResponse({ status: 200, description: 'Preferences updated' })
  async updatePreferences(@Request() req, @Body() preferences: any) {
    return this.usersService.update(req.user.id, { preferences });
  }
}