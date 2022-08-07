import { Response } from 'express';
import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';

import { MenuService } from './menu.service';

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

  @Get('ranking')
  async getSalesRanking(
    @Res() res: Response,
    @Query('category-id') categoryId: string,
  ) {
    const salesRanking = await this.menuService.getSalesRanking(
      parseInt(categoryId),
    );
    return res.status(HttpStatus.OK).json({ salesRanking });
  }
}
