import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Court } from './court.entity';
import { TimeInfo } from './time-info.entity';

@Entity()
export class CortReservationInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cort: string;

  @Column()
  cortType: string;

  @Column()
  year: string;

  @Column()
  month: string;

  @ManyToOne(() => Court, (court) => court.cortReservationInfos, {
    onDelete: 'CASCADE',
  })
  court: Court;

  @OneToMany(() => TimeInfo, (time) => time.reservationInfo, {
    cascade: true,
    eager: true,
  })
  timeInfo: TimeInfo[];
}
