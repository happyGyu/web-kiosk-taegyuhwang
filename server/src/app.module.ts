import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './typeorm.config';
import KioskModule from './kiosk/kiosk.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), KioskModule],
})
export class AppModule {}
