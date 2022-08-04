import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Option } from './option.entity';

@Entity()
export class OptionCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isOptional: boolean;

  @OneToMany(() => Option, (option) => option.id)
  options: Option[];
}
