import { useState } from 'react';
import { useCartStateContext } from 'store/cart/cartContext';
import styled, { css } from 'styled-components';
import { calculateTotalAmountOfCart } from 'utils';
import mixin from 'style/mixin';
import { colors, shadows } from 'style/constants';
import CommonModalButtons from 'components/Modal/CommonModalButtons';
import Container from 'components/common/Container';
import policy from 'policy';
import CustomButton from 'components/common/CustomButton';
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

  const leftMoney = () => Math.max(totalPrice - inputAmount, 0);
  const checkIsEnough = () => inputAmount >= totalPrice;
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
          <Amount>{leftMoney()}</Amount>
        </MoneyDisplay>
      </Container>
      <InputButtons>
        {policy.AVAILABLE_CASH.map((cashType) => (
          <CustomButton
            key={cashType}
            text={cashType.toLocaleString()}
            onClick={() => addMoney(cashType)}
            style={InputMoneyButtonStyle}
            disabled={checkIsEnough()}
          />
        ))}
      </InputButtons>
      <CommonModalButtons
        buttonInfos={[
          { text: '이전', buttonColor: colors.darkGrey, onClick: closeModal },
          {
            text: '결제하기',
            buttonColor: colors.primary,
            onClick: () => moveStage('PAY_BY_CASH'),
            disabled: !checkIsEnough(),
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
  width: 100%;
  ${mixin.flexMixin({ justify: 'space-between', wrap: 'wrap' })}
`;

const InputMoneyButtonStyle = css`
  font-size: 2rem;
  width: 45%;
  height: 6rem;
  margin-bottom: 2rem;
  background-color: ${colors.tertiary};
  color: ${colors.darkGrey};
  ${shadows.default};
  :disabled {
    background-color: ${colors.placeholder};
  }

  :hover:not([disabled]) {
    background-color: ${colors.primary};
    color: ${colors.offWhite};
  }
`;
