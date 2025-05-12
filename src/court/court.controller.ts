import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CourtService } from './court.service';
import { CreateCourtDto } from './dto/create-court.dto';

@Controller('court')
export class CourtController {
  constructor(private readonly courtService: CourtService) {}

  @Post()
  create(@Body() createCourtDto: CreateCourtDto) {
    return this.courtService.create(createCourtDto);
  }

  @Get()
  findAll() {
    return this.courtService.findAll();
  }

  @Get('search')
  search(
    @Query('start') start: string,
    @Query('end') end: string,
    @Query('day') day: string,
    @Query('cort') cort: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.courtService.searchAdvanced({
      start: start ? +start : undefined,
      end: end ? +end : undefined,
      day,
      cort,
      page: page ? +page : 1,
      limit: limit ? +limit : 10,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courtService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courtService.delete(+id);
  }
}
