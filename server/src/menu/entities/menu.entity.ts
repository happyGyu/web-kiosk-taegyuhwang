import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { MenuType } from './menuType.entity';
import { MenuHasChoice } from './menuHasChoice.entity';

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

  @OneToMany(() => MenuHasChoice, (menuHasChoice) => menuHasChoice.menuToChoice)
  choices: MenuHasChoice[];
}
