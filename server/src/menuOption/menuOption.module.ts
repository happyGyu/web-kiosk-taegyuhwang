import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MenuOptionService } from './menuOption.service';
import { MenuOptionController } from './menuOption.controller';
import { MenuOption } from './entities/menuOption.entity';
import { MenuOptionCategory } from './entities/menuOptionCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuOption, MenuOptionCategory])],
  controllers: [MenuOptionController],
  providers: [MenuOptionService],
})
export class MenuOptionModule {}
