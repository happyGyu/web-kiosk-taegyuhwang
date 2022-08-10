import styled from 'styled-components';
import { colors } from 'style/constants';
import mixin from 'style/mixin';
import { useCartStateContext } from 'store/cart/cartContext';
import { calculateTotalAmountOfCart, formatMoneyString } from 'utils';

export default function CartInfo() {
  const cartState = useCartStateContext();

  const { totalQuantity, totalPrice } = calculateTotalAmountOfCart(cartState);
  return (
    <CartInfoWrapper>
      <CartInfoItem>
        <InfoTitle>총 수량 : </InfoTitle>
        <InfoContent>{totalQuantity} 개</InfoContent>
      </CartInfoItem>
      <CartInfoItem>
        <InfoTitle>총 금액 : </InfoTitle>
        <InfoContent>{formatMoneyString(totalPrice)}</InfoContent>
      </CartInfoItem>
    </CartInfoWrapper>
  );
}

const CartInfoWrapper = styled.div`
  border-top: 3px solid ${colors.line};
  width: 100%;
  padding: 1rem;
  font-size: 1.375rem;
  font-weight: 600;
  ${mixin.flexMixin({ direction: 'column' })}
  gap: 0.5rem;
`;

const CartInfoItem = styled.div`
  width: 100%;
  ${mixin.flexMixin({ justify: 'space-between' })}
`;

const InfoTitle = styled.span``;

const InfoContent = styled.span`
  color: ${colors.primary};
`;
