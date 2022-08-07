import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Menu } from './menu.entity';

@Entity({
  orderBy: {
    id: 'ASC',
  },
})
export class MenuCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Menu, (menu) => menu.category)
  menus: Menu[];
}
