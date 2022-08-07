import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Choice } from './choice.entity';

@Entity()
export class ChoiceGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  isOptional: boolean;

  @OneToMany(() => Choice, (choice) => choice.group)
  choices: Choice[];
}
