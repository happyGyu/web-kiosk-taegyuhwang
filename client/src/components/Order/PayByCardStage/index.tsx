import Container from 'components/common/Container';
import LoadingIndicator from 'components/common/LoadingIndicator';
import CustomModal from 'components/Modal';
import CommonModalButtons from 'components/Modal/CommonModalButtons';
import CommonModalHeader from 'components/Modal/CommonModalHeader';
import useAxios from 'hooks/useAxios';
import policy from 'policy';
import { useEffect } from 'react';
import { useCartStateContext } from 'store/cart/cartContext';
import kioskStore from 'store/kiosk';
import { colors } from 'style/constants';
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
    if (paymentResult?.status === 'ok') moveStage('SHOW_BILL');
  }, [isLoading]);

  return (
    <CustomModal>
      <Container width="100%">
        <CommonModalHeader>
          <h2>결제 중 입니다.</h2>
        </CommonModalHeader>
        {isLoading && (
          <Container margin="0 auto" width="30%" height="100%">
            <LoadingIndicator />
          </Container>
        )}
        {error && (
          <CommonModalButtons
            buttonInfos={[
              {
                text: '취소',
                buttonColor: colors.darkGrey,
                onClick: closeModal,
              },
              {
                text: '재시도',
                buttonColor: colors.primary,
                onClick: () => moveStage('CHOOSE_PAYMENT_METHOD'),
              },
            ]}
          />
        )}
      </Container>
    </CustomModal>
  );
}
