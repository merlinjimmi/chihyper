import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('webhook/stripe')
  @ApiOperation({ summary: 'Stripe webhook endpoint' })
  async stripeWebhook(@Body() payload: any) {
    return this.paymentsService.handleWebhook(payload, '');
  }
}