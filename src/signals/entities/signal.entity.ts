import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum SignalStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  EXPIRED = 'expired'
}

@Entity('signals')
export class Signal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  signal_id: string;

  @Column({ default: 1 })
  version: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: SignalStatus,
    default: SignalStatus.DRAFT
  })
  status: SignalStatus;

  @Column('json')
  symbols: string[];

  @Column()
  timeframe: string;

  @Column('json')
  entry_rules: any[];

  @Column('json')
  exit_rules: any[];

  @Column('json')
  execution: any;

  @Column('json')
  meta: any;

  @Column('text', { nullable: true })
  signature: string;

  @Column('json')
  json_payload: any;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column()
  author_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  expires_at: Date;
}