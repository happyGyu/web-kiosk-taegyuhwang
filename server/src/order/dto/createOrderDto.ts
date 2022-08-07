import { SoldMenu } from 'src/order/entities/soldMenu.entity';
import { PickType } from '@nestjs/mapped-types';

export class CreateOrderDto {
  paymentMethodId: number;
  soldMenus: CreateOrderSoldMenuDto[];
}

export class CreateOrderSoldMenuDto extends PickType(SoldMenu, [
  'quantity',
] as const) {
  menuId: number;
  choiceIds: number[];
}
