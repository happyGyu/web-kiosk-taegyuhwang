import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OptionCategory } from './optionCategory.entity';

@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  extraCharge: number;

  @ManyToOne(() => OptionCategory, (optionCategory) => optionCategory.options)
  category: OptionCategory;
}
