import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from 'src/menu/entities/menu.entity';
import { MenuToMenuOption } from 'src/menu/entities/menuToMenuOption.entity';
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

// const builder =
//   this.menuOptionCategoryRepository.manager.createQueryBuilder(
//     MenuOptionCategory,
//     'category',
//   );

// const res = await builder
//   .leftJoinAndSelect(
//     MenuOption,
//     'menuOptions',
//     'menuOptions.category = category.id',
//   )
//   // .leftJoinAndSelect(
//   //   MenuToMenuOption,
//   //   'menuToMenuOption',
//   //   'menuToMenuOption.menuOption = menuOptions.id',
//   // )
//   // .leftJoinAndSelect(
//   //   Menu,
//   //   'menu',
//   //   'menuToMenuOption.menu = menu.menuOptions',
//   // )
//   .execute();
// console.log(res);

// return res;

// return builder.where('category.id = :id', { id: 1 });
