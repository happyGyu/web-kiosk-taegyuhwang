import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './typeorm.config';
import { MenuModule } from './menu/menu.module';
import { MenuOptionModule } from './menuOption/menuOption.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), MenuModule, MenuOptionModule],
})
export class AppModule {}
