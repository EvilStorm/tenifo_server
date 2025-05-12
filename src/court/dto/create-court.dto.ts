export class CreateTimeInfoDto {
  day: string;
  times: number[];
}

export class CreateCortReservationInfoDto {
  cort: string;
  cortType: string;
  year: string;
  month: string;
  timeInfo: CreateTimeInfoDto[];
}

export class CreateCourtDto {
  name: string;
  address: string;
  cortReservationInfos: CreateCortReservationInfoDto[];
}
