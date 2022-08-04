import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { MenuCategory } from './menuCategory.entity';
import { MenuToMenuOption } from './menuToMenuOption.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  basePrice: number;

  @Column()
  imgUrl: string;

  @Column()
  isSoldOut: boolean;

  @ManyToOne(() => MenuCategory, (category) => category.menus)
  category: MenuCategory;

  @OneToMany(
    () => MenuToMenuOption,
    (menuToMenuOption) => menuToMenuOption.menu,
  )
  menuOptions: MenuToMenuOption[];
}
