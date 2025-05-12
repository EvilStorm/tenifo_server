import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CourtModule } from './court/court.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전역 모듈로 사용
      envFilePath: '.env', // 환경 변수 파일 경로 (기본값)
    }),
    DatabaseModule,
    CourtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
