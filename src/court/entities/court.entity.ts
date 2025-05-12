import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CortReservationInfo } from './cort-reservation-info.entity';

@Entity()
export class Court {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  address: string;

  @OneToMany(() => CortReservationInfo, (info) => info.court, {
    cascade: true,
    eager: true,
  })
  cortReservationInfos: CortReservationInfo[];
}
