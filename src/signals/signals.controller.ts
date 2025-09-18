import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SignalsService } from './signals.service';
import { CreateSignalDto } from './dto/create-signal.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Signals')
@Controller('signals')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SignalsController {
  constructor(private signalsService: SignalsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new signal (Admin only)' })
  @ApiResponse({ status: 201, description: 'Signal created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 403, description: 'Admin access required' })
  async create(@Body() createSignalDto: CreateSignalDto, @Request() req) {
    // TODO: Add admin role check
    return this.signalsService.create(createSignalDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all signals' })
  @ApiResponse({ status: 200, description: 'List of signals' })
  async findAll() {
    return this.signalsService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active signals' })
  @ApiResponse({ status: 200, description: 'List of active signals' })
  async findActive() {
    return this.signalsService.findActive();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get signal by ID' })
  @ApiResponse({ status: 200, description: 'Signal details' })
  @ApiResponse({ status: 404, description: 'Signal not found' })
  async findOne(@Param('id') id: string) {
    return this.signalsService.findById(id);
  }

  @Put(':id/activate')
  @ApiOperation({ summary: 'Activate a signal (Admin only)' })
  @ApiResponse({ status: 200, description: 'Signal activated' })
  @ApiResponse({ status: 403, description: 'Admin access required' })
  @ApiResponse({ status: 404, description: 'Signal not found' })
  async activate(@Param('id') id: string) {
    // TODO: Add admin role check
    return this.signalsService.activate(id);
  }

  @Put(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate a signal (Admin only)' })
  @ApiResponse({ status: 200, description: 'Signal deactivated' })
  @ApiResponse({ status: 403, description: 'Admin access required' })
  @ApiResponse({ status: 404, description: 'Signal not found' })
  async deactivate(@Param('id') id: string) {
    // TODO: Add admin role check
    return this.signalsService.deactivate(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a signal (Admin only)' })
  @ApiResponse({ status: 200, description: 'Signal deleted' })
  @ApiResponse({ status: 403, description: 'Admin access required' })
  @ApiResponse({ status: 404, description: 'Signal not found' })
  async delete(@Param('id') id: string) {
    // TODO: Add admin role check
    return this.signalsService.delete(id);
  }
}