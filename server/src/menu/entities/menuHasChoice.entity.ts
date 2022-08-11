import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Menu } from './menu.entity';
import { Choice } from 'src/choice/entities/choice.entity';
import { IsNumber } from 'class-validator';

@Entity()
export class MenuHasChoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  @IsNumber()
  menuToChoiceId: number;

  @Column({ type: 'int' })
  @IsNumber()
  choiceToMenuId: number;

  @ManyToOne(() => Menu, (menu) => menu.choices)
  @JoinColumn({ name: 'menu_to_choice_id' })
  menuToChoice: Menu;

  @ManyToOne(() => Choice, (choice) => choice.menus)
  @JoinColumn({ name: 'choice_to_menu_id' })
  choiceToMenu: Choice;
}
