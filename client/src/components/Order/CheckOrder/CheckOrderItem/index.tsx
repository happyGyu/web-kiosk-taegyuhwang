import Container from 'components/common/Container';
import MenuThumbnail from 'components/common/MenuThumbnail';
import QuantityController from 'components/QuantityController';
import { useCartDispatchContext } from 'store/cart/cartContext';
import { colors } from 'style/constants';
import mixin from 'style/mixin';
import styled from 'styled-components';
import { ICartItem } from 'types';
import { formatMoneyString, makeChoiceSummary } from 'utils';

interface ICheckOrderItemProps {
  cartItem: ICartItem;
}

export default function CheckOrderItem({ cartItem }: ICheckOrderItemProps) {
  const dispatchCart = useCartDispatchContext();

  const changeQuantity = (newQuantity: number) => {
    dispatchCart({
      type: 'CHANGE_QUANTITY',
      menuId: cartItem.id,
      quantity: newQuantity,
    });
  };
  return (
    <Container flexInfo={{ direction: 'row' }} margin="3rem 5rem 0 5rem">
      <MenuThumbnail size="M" imgUrl={cartItem.imgUrl} />
      <OrderMenuInfo>
        <MenuName>{cartItem.name}</MenuName>
        <MenuChoices>{makeChoiceSummary(cartItem.choices)}</MenuChoices>
      </OrderMenuInfo>
      <Container flexInfo={{ direction: 'column' }} gap={1}>
        <QuantityController
          size="S"
          setQuantity={changeQuantity}
          quantity={cartItem.quantity}
        />
        <TotalPrice>
          {formatMoneyString(cartItem.totalPricePerEach * cartItem.quantity)}
        </TotalPrice>
      </Container>
    </Container>
  );
}

const OrderMenuInfo = styled.div`
  margin-left: 2rem;
  flex-grow: 1;
  gap: 1rem;
  ${mixin.flexMixin({ direction: 'column' })}
`;

const MenuName = styled.span`
  margin-top: 0.5rem;
  font-size: 1.5rem;
  font-weight: 500;
`;

const MenuChoices = styled.span`
  font-size: 1.25rem;
  color: ${colors.placeholder};
`;

const TotalPrice = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
`;
