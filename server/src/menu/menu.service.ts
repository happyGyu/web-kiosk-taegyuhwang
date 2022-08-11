import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Menu } from './entities/menu.entity';
import { MenuCategory } from './entities/menuCategory.entity';
import { SoldMenu } from 'src/order/entities/soldMenu.entity';
import { CreateMenuDto } from './dto/createMenuDto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(MenuCategory)
    private menuCategoryRepository: Repository<MenuCategory>,
  ) {}

  async getAllMenusByCategory(): Promise<MenuCategory[]> {
    return await this.menuCategoryRepository.find({
      relations: { menus: true },
      order: { menus: { id: 'ASC' } },
    });
  }

  async getAllCategories(): Promise<MenuCategory[]> {
    return await this.menuCategoryRepository.find();
  }

  async getById(id: number): Promise<Menu> {
    return await this.menuRepository.findOneBy({ id });
  }

  async getMenusWithSalesLog(categoryId: number) {
    return await this.menuRepository.find({
      relations: ['soldMenus'],
      select: ['id', 'name', 'soldMenus'],
      where: { category: { id: categoryId } },
    });
  }

  calculateTotalSoldQuantities(soldMenus: SoldMenu[]) {
    return soldMenus.reduce(
      (totalQuantity, soldMenu) => totalQuantity + soldMenu.quantity,
      0,
    );
  }

  getMenusWithTotalSalesLog(menusWithSalesLog: Menu[]) {
    return menusWithSalesLog.map((menuWithSalesLog) => {
      const { id, name, soldMenus } = menuWithSalesLog;
      const totalSoldQuantity = this.calculateTotalSoldQuantities(soldMenus);
      return {
        id,
        name,
        totalSoldQuantity,
      };
    });
  }

  async getSalesRanking(categoryId: number) {
    const menusWithSalesLog = await this.getMenusWithSalesLog(categoryId);
    const menusWithTotalSalesLog =
      this.getMenusWithTotalSalesLog(menusWithSalesLog);
    return menusWithTotalSalesLog.sort(
      (a, b) => b.totalSoldQuantity - a.totalSoldQuantity,
    );
  }

  async create(createMenuDto: CreateMenuDto) {
    const { name } = createMenuDto;
    const sameNameMenu = await this.menuRepository.findOneBy({ name });
    if (sameNameMenu) {
      throw new HttpException(
        { message: '동일한 이름의 메뉴가 존재합니다.' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newMenu = this.menuRepository.create(createMenuDto);
    return await this.menuRepository.save(newMenu);
  }
}
