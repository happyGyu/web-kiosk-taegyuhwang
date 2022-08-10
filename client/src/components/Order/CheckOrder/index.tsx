import Container from 'components/common/Container';
import CustomModal from 'components/Modal';
import CommonModalButtons from 'components/Modal/CommonModalButtons';
import CommonModalHeader from 'components/Modal/CommonModalHeader';
import { useCartStateContext } from 'store/cart/cartContext';
import { colors } from 'style/constants';
import mixin from 'style/mixin';
import styled from 'styled-components';
import { calculateTotalAmountOfCart, formatMoneyString } from 'utils';
import CheckOrderItem from './CheckOrderItem';

export interface IOrderStageModalProps {
  closeModal: () => void;
}

export default function CheckOrder({ closeModal }: IOrderStageModalProps) {
  const cartState = useCartStateContext();
  const { totalQuantity, totalPrice } = calculateTotalAmountOfCart(cartState);
  return (
    <CustomModal>
      <Container width="100%">
        <CommonModalHeader>
          <h2>주문 내역을 확인해주세요.</h2>
        </CommonModalHeader>
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
              onClick: closeModal,
            },
          ]}
        />
      </Container>
    </CustomModal>
  );
}

const CheckOrderWrapper = styled.div`
  max-height: 40rem;
  overflow: auto;
  margin-bottom: 3rem;
  background-color: ${colors.offWhite};
`;

const OrderStat = styled.div`
  margin: 0 5rem;
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
