import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './typeorm.config';
import { MenuModule } from './menu/menu.module';
import { OptionModule } from './option/option.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), MenuModule, OptionModule],
})
export class AppModule {}
