import { Controller, Get } from '@nestjs/common';
import { MenuCategory } from './entities/menuCategory.entity';
import { Menu } from './entities/menu.entity';
import { MenuService } from './menu.service';

@Controller('menus')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  getAllMenus(): Promise<Menu[]> {
    return this.menuService.getAllMenus();
  }

  @Get('categories')
  getAllCategories(): Promise<MenuCategory[]> {
    return this.menuService.getAllCategories();
  }
}
