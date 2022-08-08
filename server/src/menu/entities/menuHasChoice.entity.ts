import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Menu } from './menu.entity';
import { Choice } from 'src/choice/entities/choice.entity';

@Entity()
export class MenuHasChoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Menu, (menu) => menu.choices)
  menuToChoice: Menu;

  @ManyToOne(() => Choice, (choice) => choice.menus)
  choiceToMenu: Choice;
}
