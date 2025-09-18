import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Signal, SignalStatus } from './entities/signal.entity';
import { CreateSignalDto } from './dto/create-signal.dto';
import * as crypto from 'crypto';

@Injectable()
export class SignalsService {
  constructor(
    @InjectRepository(Signal)
    private signalsRepository: Repository<Signal>,
  ) {}

  private generateSignalId(): string {
    const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `sig_${date}_${randomNum}`;
  }

  private signPayload(payload: any): string {
    const secret = process.env.SIGNAL_SIGNING_SECRET || 'default-secret';
    const payloadString = JSON.stringify(payload);
    return crypto.createHmac('sha256', secret).update(payloadString).digest('base64');
  }

  async create(createSignalDto: CreateSignalDto, authorId: string): Promise<Signal> {
    const signal_id = this.generateSignalId();
    
    // Create the complete signal payload
    const signalPayload = {
      signal_id,
      version: 1,
      author: authorId,
      name: createSignalDto.name,
      description: createSignalDto.description,
      status: SignalStatus.DRAFT,
      symbols: createSignalDto.symbols,
      timeframe: createSignalDto.timeframe,
      entry_rules: createSignalDto.entry_rules,
      exit_rules: createSignalDto.exit_rules,
      execution: createSignalDto.execution,
      meta: createSignalDto.meta,
    };

    // Sign the payload
    const signature = this.signPayload(signalPayload);
    const completePayload = { ...signalPayload, signature };

    // Create signal entity
    const signal = this.signalsRepository.create({
      signal_id,
      version: 1,
      name: createSignalDto.name,
      description: createSignalDto.description,
      status: SignalStatus.DRAFT,
      symbols: createSignalDto.symbols,
      timeframe: createSignalDto.timeframe,
      entry_rules: createSignalDto.entry_rules,
      exit_rules: createSignalDto.exit_rules,
      execution: createSignalDto.execution,
      meta: createSignalDto.meta,
      signature,
      json_payload: completePayload,
      author_id: authorId,
      expires_at: new Date(Date.now() + createSignalDto.meta.ttl_seconds * 1000),
    });

    return this.signalsRepository.save(signal);
  }

  async findAll(): Promise<Signal[]> {
    return this.signalsRepository.find({
      relations: ['author'],
      order: { created_at: 'DESC' },
    });
  }

  async findById(id: string): Promise<Signal> {
    return this.signalsRepository.findOne({
      where: { id },
      relations: ['author'],
    });
  }

  async findActive(): Promise<Signal[]> {
    return this.signalsRepository.find({
      where: { status: SignalStatus.ACTIVE },
      relations: ['author'],
    });
  }

  async activate(id: string): Promise<Signal> {
    await this.signalsRepository.update(id, { status: SignalStatus.ACTIVE });
    return this.findById(id);
  }

  async deactivate(id: string): Promise<Signal> {
    await this.signalsRepository.update(id, { status: SignalStatus.INACTIVE });
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.signalsRepository.delete(id);
  }
}