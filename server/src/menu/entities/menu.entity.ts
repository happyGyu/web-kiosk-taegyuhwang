import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MenuCategory } from './menuCategory.entity';

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
}
