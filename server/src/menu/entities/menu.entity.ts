import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { MenuCategory } from './menuCategory.entity';
import { MenuHasChoice } from './menuHasChoice.entity';
import { SoldMenu } from 'src/order/entities/soldMenu.entity';

@Entity({
  orderBy: {
    id: 'DESC',
  },
})
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

  @ManyToOne(() => MenuCategory, (category) => category.menus)
  category: MenuCategory;

  @OneToMany(() => MenuHasChoice, (menuHasChoice) => menuHasChoice.menuToChoice)
  choices: MenuHasChoice[];

  @OneToMany(() => SoldMenu, (soldMenu) => soldMenu.menu)
  soldMenus: SoldMenu[];
}
