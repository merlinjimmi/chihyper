import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsObject, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class EntryRule {
  @ApiProperty({ example: 'price_break' })
  @IsString()
  type: string;

  @ApiProperty({ example: 'buy' })
  @IsString()
  direction: string;

  @ApiProperty({ example: 'close' })
  @IsString()
  bar: string;

  @ApiProperty({ example: 'close>resistance1' })
  @IsString()
  condition: string;
}

export class ExitRule {
  @ApiProperty({ example: 'take_profit' })
  @IsString()
  type: string;

  @ApiProperty({ example: '2.0*atr' })
  @IsString()
  value: string;
}

export class ExecutionConfig {
  @ApiProperty({ example: 'market' })
  @IsString()
  order_type: string;

  @ApiProperty({ example: 'percent_balance' })
  @IsString()
  risk_mode: string;

  @ApiProperty({ example: 1.5 })
  @IsNumber()
  risk_value: number;

  @ApiProperty({ example: null, required: false })
  @IsOptional()
  @IsNumber()
  fixed_lot?: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  max_lots: number;
}

export class SignalMeta {
  @ApiProperty({ example: 12345 })
  @IsNumber()
  magic_number: number;

  @ApiProperty({ example: 300 })
  @IsNumber()
  ttl_seconds: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  priority: number;
}

export class CreateSignalDto {
  @ApiProperty({ example: 'Breakout_XAUUSD' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Breakout based on 1H volatility filter + ATR SL/TP' })
  @IsString()
  description: string;

  @ApiProperty({ example: ['XAUUSD', 'XAUUSDm'] })
  @IsArray()
  @IsString({ each: true })
  symbols: string[];

  @ApiProperty({ example: 'H1' })
  @IsString()
  timeframe: string;

  @ApiProperty({ type: [EntryRule] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EntryRule)
  entry_rules: EntryRule[];

  @ApiProperty({ type: [ExitRule] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExitRule)
  exit_rules: ExitRule[];

  @ApiProperty({ type: ExecutionConfig })
  @IsObject()
  @ValidateNested()
  @Type(() => ExecutionConfig)
  execution: ExecutionConfig;

  @ApiProperty({ type: SignalMeta })
  @IsObject()
  @ValidateNested()
  @Type(() => SignalMeta)
  meta: SignalMeta;
}