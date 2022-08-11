import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { MenuCategory } from './menuCategory.entity';
import { MenuHasChoice } from './menuHasChoice.entity';
import { SoldMenu } from 'src/order/entities/soldMenu.entity';
import {
  IsBoolean,
  IsDecimal,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  name: string;

  @Column('decimal')
  @IsDecimal()
  basePrice: number;

  @Column()
  @IsUrl()
  imgUrl: string;

  @Column()
  @IsBoolean()
  isSoldOut: boolean;

  @Column({ type: 'int' })
  @IsNumber()
  categoryId: number;

  @ManyToOne(() => MenuCategory, (category) => category.menus)
  @JoinColumn({ name: 'category_id' })
  category: MenuCategory;

  @OneToMany(() => MenuHasChoice, (menuHasChoice) => menuHasChoice.menuToChoice)
  choices: MenuHasChoice[];

  @OneToMany(() => SoldMenu, (soldMenu) => soldMenu.menu)
  soldMenus: SoldMenu[];
}
