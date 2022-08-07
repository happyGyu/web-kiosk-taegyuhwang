import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { MenuCategory } from './entities/menuCategory.entity';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, MenuCategory])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
