import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Menu } from './menu.entity';

@Entity()
export class MenuCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Menu, (menu) => menu.category)
  menus: Menu[];
}
