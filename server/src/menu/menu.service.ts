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
    private categoryRepository: Repository<MenuCategory>,
  ) {}

  async getAllMenus(): Promise<Menu[]> {
    this.menuRepository.createQueryBuilder('menu');
    return await this.menuRepository.find();
  }

  async getAllCategories(): Promise<MenuCategory[]> {
    return await this.categoryRepository.find();
  }
}
