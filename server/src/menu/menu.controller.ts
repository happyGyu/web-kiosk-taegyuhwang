import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Response } from 'express';

@Controller('menus')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  async getAllMenusByCategory(@Res() res: Response) {
    const menus = await this.menuService.getAllMenusByCategory();
    return res.status(HttpStatus.OK).json(menus);
  }

  @Get('categories')
  async getAllCategories(@Res() res: Response) {
    const categories = await this.menuService.getAllCategories();
    return res.status(HttpStatus.OK).json({ categories });
  }
}
