import { MenuCategory } from './entities/menuCategory.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuController } from './menu.controller';
import { Menu } from './entities/menu.entity';
import { MenuService } from './menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, MenuCategory])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
