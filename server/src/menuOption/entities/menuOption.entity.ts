import { MenuToMenuOption } from 'src/menu/entities/menuToMenuOption.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuOptionCategory } from './menuOptionCategory.entity';

@Entity()
export class MenuOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  extraCharge: number;

  @ManyToOne(
    () => MenuOptionCategory,
    (customOptionCategory) => customOptionCategory.menuOptions,
  )
  category: MenuOptionCategory;

  @OneToMany(
    () => MenuToMenuOption,
    (menuToMenuOption) => menuToMenuOption.menuOption,
  )
  menus: MenuToMenuOption[];
}
