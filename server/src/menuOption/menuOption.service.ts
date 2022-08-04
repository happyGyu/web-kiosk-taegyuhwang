import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuOptionDto } from './dto/createMenuOption.dto';
import { UpdateMenuOptionDto } from './dto/updateMenuOption.dto';
import { MenuOption } from './entities/menuOption.entity';
import { MenuOptionCategory } from './entities/menuOptionCategory.entity';

@Injectable()
export class MenuOptionService {
  constructor(
    @InjectRepository(MenuOption)
    private menuOptionRepository: Repository<MenuOption>,
    @InjectRepository(MenuOptionCategory)
    private menuOptionCategoryRepository: Repository<MenuOptionCategory>,
  ) {}

  create(createMenuOptionDto: CreateMenuOptionDto) {
    return 'This action adds a new option';
  }

  findAll() {
    return `This action returns all option`;
  }

  findOne(id: number) {
    return `This action returns a #${id} option`;
  }

  update(id: number, updateMenuOptionDto: UpdateMenuOptionDto) {
    return `This action updates a #${id} option`;
  }

  remove(id: number) {
    return `This action removes a #${id} option`;
  }

  async getMenuOptionsByMenuId(menuId: number) {
    return await this.menuOptionCategoryRepository.find({
      where: {
        menuOptions: {
          menus: {
            menu: {
              id: menuId,
            },
          },
        },
      },
      relations: ['menuOptions'],
    });
  }
}
