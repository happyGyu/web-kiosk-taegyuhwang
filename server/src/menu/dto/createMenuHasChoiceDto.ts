import { MenuHasChoice } from 'src/menu/entities/menuHasChoice.entity';
import { PickType } from '@nestjs/mapped-types';

export class CreateMenuHasChoiceDto extends PickType(MenuHasChoice, [
  'choiceToMenuId',
  'menuToChoiceId',
]) {}
