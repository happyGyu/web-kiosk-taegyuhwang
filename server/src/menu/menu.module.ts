import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Menu } from './entities/menu.entity';
import { MenuCategory } from './entities/menuCategory.entity';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, MenuCategory])],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
