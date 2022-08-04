import { Choice } from 'src/choice/entities/choice.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SoldMenu } from './soldMenu.entity';

@Entity()
export class SoldMenuHasChoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SoldMenu, (soldMenu) => soldMenu.choices)
  soldMenuToChoice: SoldMenu;

  @ManyToOne(() => Choice, (choice) => choice.soldMenus)
  choiceToSoldMenu: Choice;
}
