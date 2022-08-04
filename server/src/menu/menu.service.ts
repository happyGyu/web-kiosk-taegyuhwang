import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuCategory } from './entities/menuCategory.entity';
import { Menu } from './entities/menu.entity';

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
      relations: {
        menus: true,
      },
    });
  }

  async getAllCategories(): Promise<MenuCategory[]> {
    return await this.menuCategoryRepository.find();
  }
}
