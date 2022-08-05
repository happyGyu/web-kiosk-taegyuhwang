import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './typeorm.config';
import { MenuModule } from './menu/menu.module';
import { ChoiceModule } from './choice/choice.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), MenuModule, ChoiceModule],
})
export class AppModule {}
