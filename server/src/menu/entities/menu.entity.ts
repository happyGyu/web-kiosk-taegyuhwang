import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { MenuType } from './menuType';
import { MenuToMenuOption } from './menuToMenuOption.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('decimal')
  basePrice: number;

  @Column()
  imgUrl: string;

  @Column()
  isSoldOut: boolean;

  @ManyToOne(() => MenuType, (category) => category.menus)
  type: MenuType;

  @OneToMany(
    () => MenuToMenuOption,
    (menuToMenuOption) => menuToMenuOption.menu,
  )
  menuOptions: MenuToMenuOption[];
}
