import { CreateMenuDto } from './dto/createMenuDto';
import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';

import { MenuService } from './menu.service';
import { CreateMenuHasChoiceDto } from './dto/createMenuHasChoiceDto';

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
    return res.status(HttpStatus.OK).json(categories);
  }

  @Get('ranking')
  async getSalesRanking(
    @Res() res: Response,
    @Query('category-id') categoryId: string,
  ) {
    const salesRanking = await this.menuService.getSalesRanking(
      parseInt(categoryId),
    );
    return res.status(HttpStatus.OK).json(salesRanking);
  }

  @Post()
  async create(@Res() res: Response, @Body() createMenuDto: CreateMenuDto) {
    const newMenu = await this.menuService.create(createMenuDto);
    return res.status(HttpStatus.CREATED).json({ ok: true, data: newMenu });
  }

  @Post('choice')
  async addChoiceToMenu(
    @Res() res: Response,
    @Body() createMenuHasChoiceDto: CreateMenuHasChoiceDto,
  ) {
    await this.menuService.createMenuHasChoice(createMenuHasChoiceDto);
    return res.status(HttpStatus.CREATED).json({ ok: true });
  }
}
