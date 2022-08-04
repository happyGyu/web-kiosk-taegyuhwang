import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuType } from './entities/menuType';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuType)
    private menuTypeRepository: Repository<MenuType>,
  ) {}

  async getAllMenusByCategory(): Promise<MenuType[]> {
    return await this.menuTypeRepository.find({
      relations: {
        menus: true,
      },
    });
  }

  async getAllCategories(): Promise<MenuType[]> {
    return await this.menuTypeRepository.find();
  }
}
