import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChoiceGroup } from './choiceGroup.entity';
import { MenuHasChoice } from 'src/menu/entities/menuHasChoice.entity';
import { SoldMenuHasChoice } from 'src/order/entities/soldMenuHasChoice.entity';

@Entity()
export class Choice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  extraCharge: number;

  @ManyToOne(() => ChoiceGroup, (choiceGroup) => choiceGroup.choices)
  group: ChoiceGroup;

  @OneToMany(() => MenuHasChoice, (menuHasChoice) => menuHasChoice.choiceToMenu)
  menus: MenuHasChoice[];

  @OneToMany(
    () => SoldMenuHasChoice,
    (soldMenuHasChoice) => soldMenuHasChoice.choiceToSoldMenu,
  )
  soldMenus: SoldMenuHasChoice;
}
