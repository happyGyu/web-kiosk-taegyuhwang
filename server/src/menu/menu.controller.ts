import { Controller, Get } from '@nestjs/common';
import { Menu } from './menu.entity';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  getAllMenus(): Promise<Menu[]> {
    return this.menuService.getAllMenus();
  }
}
