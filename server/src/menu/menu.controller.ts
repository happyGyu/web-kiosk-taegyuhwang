import { Controller, Get } from '@nestjs/common';
import { MenuType } from './entities/menuType.entity';
import { MenuService } from './menu.service';

@Controller('menus')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  getAllMenusByCategory(): Promise<MenuType[]> {
    return this.menuService.getAllMenusByCategory();
  }
}
