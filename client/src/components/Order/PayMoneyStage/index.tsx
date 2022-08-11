import Container from 'components/common/Container';
import LoadingIndicator from 'components/common/LoadingIndicator';
import CommonModalButtons from 'components/Modal/CommonModalButtons';
import useAxios from 'hooks/useAxios';
import policy from 'policy';
import { useEffect } from 'react';
import {
  useCartDispatchContext,
  useCartStateContext,
} from 'store/cart/cartContext';
import kioskStore from 'store/kiosk';
import { colors } from 'style/constants';
import styled from 'styled-components';
import { PostOrderApiResponseDto } from 'types';
import { IOrderModalProps, TPaymentMethod } from '../types';

interface IPayMoneyStageProps extends IOrderModalProps {
  paymentMethodName: TPaymentMethod;
  setOrderResult: React.Dispatch<PostOrderApiResponseDto | null>;
}

export default function PayMoneyStage({
  closeModal,
  moveStage,
  paymentMethodName,
  setOrderResult,
}: IPayMoneyStageProps) {
  const cartState = useCartStateContext();
  const dispatchCart = useCartDispatchContext();

  const getPaymentMethodId = (pmName: TPaymentMethod) =>
    kioskStore.data.paymentMethods.find(
      (pm) => pm.name === policy.PAYMENT_METHOD_NAMES[pmName]
    )?.id;

  const getSoldMenus = () =>
    cartState.map((cartItem) => ({
      quantity: cartItem.quantity,
      menuId: cartItem.id,
      choiceIds: cartItem.choices.map((choice) => choice.id),
    }));

  const makeOrderRequestBody = () => {
    const paymentMethodId = getPaymentMethodId(paymentMethodName);
    const soldMenus = getSoldMenus();
    return {
      paymentMethodId,
      soldMenus,
    };
  };

  const handleCancleClick = () => {
    dispatchCart({ type: 'DELETE_ALL' });
    closeModal();
  };

  const orderRequestBody = makeOrderRequestBody();
  const {
    data: paymentResult,
    error,
    isLoading,
  } = useAxios<PostOrderApiResponseDto>('/order', 'post', orderRequestBody);

  useEffect(() => {
    if (paymentResult?.status !== 'ok') return;
    setOrderResult(paymentResult);
    dispatchCart({ type: 'DELETE_ALL' });
    moveStage('SHOW_BILL');
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <Container margin="15rem auto" width="10rem" height="10rem">
          <LoadingIndicator />
        </Container>
      )}
      {error && (
        <>
          <FailureMessage>결제가 정상처리 되지 않았습니다.</FailureMessage>
          <FailureDescription>
            {`취소를 누르면 초기화면으로 돌아갑니다.\n다시 결제하시려면 재시도를 눌러주세요.`}
          </FailureDescription>
          <CommonModalButtons
            buttonInfos={[
              {
                text: '취소',
                buttonColor: colors.darkGrey,
                onClick: handleCancleClick,
              },
              {
                text: '재시도',
                buttonColor: colors.primary,
                onClick: () => moveStage('CHOOSE_PAYMENT_METHOD'),
              },
            ]}
          />
        </>
      )}
    </>
  );
}

const FailureMessage = styled.span`
  width: 100%;
  margin-top: 12rem;
  text-align: center;
  color: ${colors.error};
  font-size: 2rem;
  font-weight: 600;
`;

const FailureDescription = styled.p`
  color: ${colors.darkGrey};
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 3rem;
  margin: 0 auto;
  white-space: pre-wrap;
`;
