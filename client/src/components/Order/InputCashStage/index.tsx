import { useState } from 'react';
import { useCartStateContext } from 'store/cart/cartContext';
import styled from 'styled-components';
import { calculateTotalAmountOfCart } from 'utils';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import mixin from 'style/mixin';
import { colors } from 'style/constants';
import CommonModalButtons from 'components/Modal/CommonModalButtons';
import Container from 'components/common/Container';
import { IOrderModalProps } from '../types';

export default function InputCashStage({
  closeModal,
  moveStage,
}: IOrderModalProps) {
  const cartState = useCartStateContext();
  const { totalPrice } = calculateTotalAmountOfCart(cartState);
  const [inputAmount, setInputAmount] = useState<number>(0);

  const addMoney = (amount: number) => {
    setInputAmount((prev) => prev + amount);
  };

  return (
    <>
      <Container
        width="100%"
        flexInfo={{ justify: 'space-between', align: 'flex-end' }}
      >
        <MoneyDisplay>
          <span>총 상품 금액</span>
          <Amount>{totalPrice}</Amount>
        </MoneyDisplay>
        <Sign> - </Sign>
        <MoneyDisplay>
          <span>투입 금액</span>
          <Amount>{inputAmount}</Amount>
        </MoneyDisplay>
        <Sign> = </Sign>
        <MoneyDisplay>
          <span>잔여 금액</span>
          <Amount>{totalPrice - inputAmount}</Amount>
        </MoneyDisplay>
      </Container>
      <InputButtons />
      <CommonModalButtons
        buttonInfos={[
          { text: '이전', buttonColor: colors.darkGrey, onClick: closeModal },
          {
            text: '결제하기',
            buttonColor: colors.primary,
            onClick: () => moveStage('PAY_BY_CASH'),
          },
        ]}
      />
    </>
  );
}

const MoneyDisplay = styled.div`
  ${mixin.flexMixin({ direction: 'column', align: 'center' })}
  gap: 1rem;
  font-size: 1.5rem;
`;

const Sign = styled.span`
  margin-bottom: 0.25rem;
  font-weight: 700;
  font-size: 2rem;
`;

const Amount = styled.span`
  font-weight: 600;
  font-size: 2rem;
  color: ${colors.secondary};
`;

const InputButtons = styled.div`
  ${mixin.flexMixin({ justify: 'space-between', wrap: 'wrap' })}
`;
