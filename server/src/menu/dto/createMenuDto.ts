import { Menu } from '../entities/menu.entity';
import { PickType } from '@nestjs/mapped-types';

export class CreateMenuDto extends PickType(Menu, [
  'name',
  'imgUrl',
  'basePrice',
  'isSoldOut',
  'categoryId',
]) {}
