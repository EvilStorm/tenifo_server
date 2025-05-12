import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Court } from './entities/court.entity';
import { CortReservationInfo } from './entities/cort-reservation-info.entity';
import { TimeInfo } from './entities/time-info.entity';
import { CourtService } from './court.service';
import { CourtController } from './court.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Court, CortReservationInfo, TimeInfo])],
  providers: [CourtService],
  controllers: [CourtController],
})
export class CourtModule {}
