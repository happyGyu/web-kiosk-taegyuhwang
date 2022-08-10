import CommonModalButtons from 'components/Modal/CommonModalButtons';
import { useCartStateContext } from 'store/cart/cartContext';
import { colors } from 'style/constants';
import mixin from 'style/mixin';
import styled from 'styled-components';
import { calculateTotalAmountOfCart, formatMoneyString } from 'utils';
import { IOrderModalProps } from '../types';
import CheckOrderItem from './CheckOrderItem';

export default function CheckOrderStage({
  closeModal,
  moveStage,
}: IOrderModalProps) {
  const cartState = useCartStateContext();
  const { totalQuantity, totalPrice } = calculateTotalAmountOfCart(cartState);
  return (
    <>
      <CheckOrderWrapper>
        {cartState.map((cartItem) => (
          <CheckOrderItem
            key={`${cartItem.id}_${JSON.stringify(cartItem.choices)}`}
            cartItem={cartItem}
          />
        ))}
      </CheckOrderWrapper>
      <OrderStat>
        <Stat>
          총 수량 : <HighlightedStat>{totalQuantity}</HighlightedStat>
        </Stat>
        <Stat>
          총 금액 :{' '}
          <HighlightedStat>{formatMoneyString(totalPrice)}</HighlightedStat>
        </Stat>
      </OrderStat>
      <CommonModalButtons
        buttonInfos={[
          { text: '이전', buttonColor: colors.darkGrey, onClick: closeModal },
          {
            text: '결제하기',
            buttonColor: colors.primary,
            onClick: () => moveStage('CHOOSE_PAYMENT_METHOD'),
          },
        ]}
      />
    </>
  );
}

const CheckOrderWrapper = styled.div`
  width: 100%;
  max-height: 40rem;
  overflow: auto;
  margin-bottom: 3rem;
  flex-grow: 1;
  background-color: ${colors.offWhite};
`;

const OrderStat = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  ${mixin.flexMixin({ justify: 'space-between', align: 'center' })}
`;

const Stat = styled.div`
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 500;
  ${mixin.flexMixin({ justify: 'space-between', align: 'center' })};
`;

const HighlightedStat = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.primary};
`;
