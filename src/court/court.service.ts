// src/court/court.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Court } from './entities/court.entity';
import { CreateCourtDto } from './dto/create-court.dto';

@Injectable()
export class CourtService {
  constructor(
    @InjectRepository(Court)
    private courtRepository: Repository<Court>,
    private dataSource: DataSource,
  ) {}

  async create(createCourtDto: CreateCourtDto): Promise<Court> {
    createCourtDto.cortReservationInfos.forEach((info) => {
      info.timeInfo = info.timeInfo.filter(
        (t) => t.day !== undefined && t.day !== null && t.day !== '',
      );
    });
    const existing = await this.courtRepository.findOne({
      where: { address: createCourtDto.address },
    });
    if (existing) {
      await this.courtRepository.remove(existing);
    }
    const newCourt = this.courtRepository.create(createCourtDto);
    return await this.courtRepository.save(newCourt);
  }

  async findAll(): Promise<Court[]> {
    return this.courtRepository.find();
  }

  async findOne(id: number): Promise<Court | null> {
    return this.courtRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.courtRepository.delete(id);
  }

  async searchAdvanced(options: {
    start?: number;
    end?: number;
    day?: string;
    cort?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Court[]; total: number }> {
    const queryBuilder = this.dataSource
      .getRepository(Court)
      .createQueryBuilder('court')
      .leftJoinAndSelect('court.cortReservationInfos', 'cri')
      .leftJoinAndSelect('cri.timeInfo', 'ti');

    if (options.cort) {
      queryBuilder.andWhere('cri.cort ILIKE :cort', {
        cort: `%${options.cort}%`,
      });
    }

    if (options.day) {
      queryBuilder.andWhere('ti.day = :day', { day: options.day });
    }

    if (options.start !== undefined && options.end !== undefined) {
      const start = options.start;
      const end = options.end;
      const requiredTimes = Array.from(
        { length: end - start + 1 },
        (_, i) => i + start,
      );

      for (const time of requiredTimes) {
        queryBuilder.andWhere(`ti.times @> :time${time}`, {
          [`time${time}`]: JSON.stringify([time]),
        });
      }
    }

    const total = await queryBuilder.getCount();

    const page = options.page ?? 1;
    const limit = options.limit ?? 10;

    const data = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return { data, total };
  }
}
