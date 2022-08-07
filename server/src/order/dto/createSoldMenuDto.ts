import { PickType } from '@nestjs/mapped-types';
import { SoldMenu } from 'src/order/entities/soldMenu.entity';

export class CreateSoldMenuDto extends PickType(SoldMenu, [
  'menu',
  'choiceSummary',
  'quantity',
  'sales',
  'order',
] as const) {}
