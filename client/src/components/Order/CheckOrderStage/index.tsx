import CommonModalButtons from 'components/Modal/CommonModalButtons';
import { useCartStateContext } from 'store/cart/cartContext';
import { colors } from 'style/constants';
import styled from 'styled-components';
import { calculateTotalAmountOfCart } from 'utils';
import TotalAmount from '../common/TotalAmount';
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
        {cartState.map((cartItem, cartItemIdx) => (
          <CheckOrderItem
            key={`${cartItem.id}_${JSON.stringify(cartItem.choices)}`}
            cartItem={cartItem}
            cartItemIdx={cartItemIdx}
          />
        ))}
      </CheckOrderWrapper>
      <TotalAmount totalPrice={totalPrice} totalQuantity={totalQuantity} />
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
