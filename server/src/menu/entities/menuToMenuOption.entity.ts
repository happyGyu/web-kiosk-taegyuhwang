import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Menu } from './menu.entity';
import { MenuOption } from 'src/menuOption/entities/menuOption.entity';

@Entity()
export class MenuToMenuOption {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Menu, (menu) => menu.menuOptions)
  menu: Menu;

  @ManyToOne(() => MenuOption, (menuOption) => menuOption.menus)
  menuOption: MenuOption;
}
