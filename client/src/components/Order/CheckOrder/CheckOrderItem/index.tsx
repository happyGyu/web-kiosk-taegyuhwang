import MenuThumbnail from 'components/common/MenuThumbnail';
import { ICartItem } from 'types';

interface ICheckOrderItemProps {
  cartItem: ICartItem;
}

export default function CheckOrderItem({ cartItem }: ICheckOrderItemProps) {
  return <MenuThumbnail size="M" imgUrl={cartItem.imgUrl} />;
}
