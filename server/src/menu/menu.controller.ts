import { Controller, Get, Param } from '@nestjs/common';
import { MenuCategory } from './entities/menuCategory.entity';
import { MenuService } from './menu.service';

@Controller('menus')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  getAllMenusByCategory(): Promise<MenuCategory[]> {
    return this.menuService.getAllMenusByCategory();
  }

  @Get('categories')
  getAllCategories(): Promise<MenuCategory[]> {
    return this.menuService.getAllCategories();
  }

  @Get('/:id')
  getMenuOptionsByMenuId(@Param('id') menuId: string) {
    return this.menuService.getMenuOptions(parseInt(menuId));
  }
}
