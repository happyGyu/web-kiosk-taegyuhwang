import Container from 'components/common/Container';
import CustomModal from 'components/Modal';
import CommonModalButtons from 'components/Modal/CommonModalButtons';
import CommonModalHeader from 'components/Modal/CommonModalHeader';
import useAxios from 'hooks/useAxios';
import policy from 'policy';
import { useEffect } from 'react';
import { useCartStateContext } from 'store/cart/cartContext';
import kioskStore from 'store/kiosk';
import { colors } from 'style/constants';
import mixin from 'style/mixin';
import styled from 'styled-components';
import { IOrderModalProps, TPaymentMethod } from '../types';

export default function PayByCardStage({
  closeModal,
  moveStage,
}: IOrderModalProps) {
  const cartState = useCartStateContext();

  const getPaymentMethodId = (paymentMethodName: TPaymentMethod) =>
    kioskStore.data.paymentMethods.find(
      (pm) => pm.name === policy.PAYMENT_METHOD_NAMES[paymentMethodName]
    )?.id;

  const getSoldMenus = () =>
    cartState.map((cartItem) => ({
      quantity: cartItem.quantity,
      menuId: cartItem.id,
      choiceIds: cartItem.choices.map((choice) => choice.id),
    }));

  const makeOrderRequestBody = () => {
    const paymentMethodId = getPaymentMethodId('CARD');
    const soldMenus = getSoldMenus();
    return {
      paymentMethodId,
      soldMenus,
    };
  };

  const orderRequestBody = makeOrderRequestBody();
  const {
    data: paymentResult,
    error,
    isLoading,
  } = useAxios<{ status: 'ok' | 'fail' }>('/order', 'post', orderRequestBody);

  useEffect(() => {
    if (paymentResult?.status === 'ok') alert('성공!');
  }, [isLoading]);

  return (
    <CustomModal>
      <Container width="100%">
        <CommonModalHeader>
          <h2>결제 중 입니다.</h2>
        </CommonModalHeader>
        {isLoading && <div>로딩중</div>}
        {error && (
          <CommonModalButtons
            buttonInfos={[
              {
                text: '취소',
                buttonColor: colors.darkGrey,
                onClick: closeModal,
              },
            ]}
          />
        )}
      </Container>
    </CustomModal>
  );
}

const PaymentMethodWrapper = styled.div`
  ${mixin.flexMixin({ align: 'center', justify: 'space-between' })}
  padding: 3rem 5rem;
  gap: 2rem;
`;

const PaymentMethodButton = styled.button`
  width: 33%;
  height: 12rem;
  font-size: 1.5rem;
  font-weight: 600;
  ${mixin.flexMixin({
    direction: 'column',
    align: 'center',
    justify: 'center',
    wrap: 'wrap',
  })}
  border: 3px solid ${colors.placeholder};
  color: ${colors.placeholder};

  :hover {
    border-color: ${colors.primary};
    color: ${colors.primary};
  }
`;
