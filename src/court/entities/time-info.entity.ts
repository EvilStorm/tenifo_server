// src/court/entities/time-info.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CortReservationInfo } from './cort-reservation-info.entity';

@Entity()
export class TimeInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: string;

  @Column('jsonb')
  times: number[];

  @ManyToOne(() => CortReservationInfo, (info) => info.timeInfo, {
    onDelete: 'CASCADE',
  })
  reservationInfo: CortReservationInfo;
}
