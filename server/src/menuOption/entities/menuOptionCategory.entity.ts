import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MenuOption } from './menuOption.entity';

@Entity()
export class MenuOptionCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isOptional: boolean;

  @OneToMany(() => MenuOption, (menuOption) => menuOption.id)
  menuOptions: MenuOption[];
}
