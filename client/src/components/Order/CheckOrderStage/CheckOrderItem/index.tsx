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
  cartItemIdx: number;
}

export default function CheckOrderItem({
  cartItem,
  cartItemIdx,
}: ICheckOrderItemProps) {
  const dispatchCart = useCartDispatchContext();

  const changeQuantity = (newQuantity: number) => {
    dispatchCart({
      type: 'CHANGE_QUANTITY',
      cartItemIdx,
      quantity: newQuantity,
    });
  };

  const { name, imgUrl, choices, quantity, price } = cartItem;
  return (
    <CheckOrderItemWrapper>
      <MenuThumbnail size="M" imgUrl={imgUrl} />
      <OrderMenuInfo>
        <MenuName>{name}</MenuName>
        <MenuChoices>{makeChoiceSummary(choices)}</MenuChoices>
      </OrderMenuInfo>
      <Container
        flexInfo={{
          direction: 'column',
          justify: 'space-around',
          align: 'flex-end',
        }}
      >
        <QuantityController
          size="S"
          setQuantity={changeQuantity}
          quantity={quantity}
        />
        <MenuPrice>{formatMoneyString(price * quantity)}</MenuPrice>
      </Container>
    </CheckOrderItemWrapper>
  );
}

const CheckOrderItemWrapper = styled.div`
  height: 10rem;
  padding: 2rem 0;
  display: flex;
  border-bottom: 1px solid ${colors.darkGrey};
`;

const OrderMenuInfo = styled.div`
  margin-left: 2rem;
  flex-grow: 1;
  ${mixin.flexMixin({ direction: 'column', justify: 'space-around' })}
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

const MenuPrice = styled.span`
  font-size: 1.375rem;
  font-weight: 600;
`;
