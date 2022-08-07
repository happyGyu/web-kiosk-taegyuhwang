import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { MenuCategory } from './entities/menuCategory.entity';

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
}
