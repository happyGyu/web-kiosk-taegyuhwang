import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Menu } from './menu.entity';

@Entity()
export class MenuType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Menu, (menu) => menu.type)
  menus: Menu[];
}
