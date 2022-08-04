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

  async getMenuOptions(menuId: number): Promise<Menu> {
    return await this.menuRepository.findOne({
      where: { id: menuId },
      relations: ['menuOptions.menuOption.category'],
    });
  }
}

//   await getManager()
//         .createQueryBuilder(table1, 't1')
//         .select('t1.id', 't1_id')
//         .addSelect('t2.id_2', 't2_id_2')
//         .addSelect('t3.event', 't3_event')
//         .addSelect('t4.column1', 't4_column1') // up to this point: SELECT t1.id,t2.id_2,t3.event,t3.column1,t4.column1 FROM table1 t1
//         .innerJoin(table2, 't2', 't1.id = t2.id') //INNER JOIN table2 t2 ON t1.id = t2.id
//         .innerJoin(table3, 't3', 't2.event = t3.event') // INNER JOIN table3 t3 ON t2.event = t3.event
//         .innerJoin(table4, 't4', 't4.id = t2.id_2') // INNER JOIN table4 t4 ON t4.id = t2.id_2
//         .where('t3.event = 2019') // WHERE t3.event = 2019
//         .getRawMany() // depend on what you need really
// }
