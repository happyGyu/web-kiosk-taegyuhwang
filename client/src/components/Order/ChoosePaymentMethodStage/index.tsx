import Container from 'components/common/Container';
import CustomModal from 'components/Modal';
import CommonModalButtons from 'components/Modal/CommonModalButtons';
import CommonModalHeader from 'components/Modal/CommonModalHeader';
import kioskStore from 'store/kiosk';
import { colors } from 'style/constants';
import mixin from 'style/mixin';
import styled from 'styled-components';
import { IOrderModalProps, TOrderStage } from '../types';

export default function ChoosePaymentMethodStage({
  closeModal,
  moveStage,
}: IOrderModalProps) {
  const { paymentMethods } = kioskStore.data;

  interface IPaymentMethodStages {
    [key: string]: TOrderStage;
  }

  const paymentMethodStages: IPaymentMethodStages = {
    카드: 'PAY_BY_CARD',
    현금: 'PAY_BY_CASH',
  };

  return (
    <CustomModal>
      <Container width="100%">
        <CommonModalHeader>
          <h2>결제 수단을 선택해주세요.</h2>
        </CommonModalHeader>
        <PaymentMethodWrapper>
          {paymentMethods.map((paymentMethod) => (
            <PaymentMethodButton
              key={paymentMethod.id}
              onClick={() => moveStage(paymentMethodStages[paymentMethod.name])}
            >
              {paymentMethod.name}
            </PaymentMethodButton>
          ))}
        </PaymentMethodWrapper>
        <CommonModalButtons
          buttonInfos={[
            {
              text: '취소',
              buttonColor: colors.darkGrey,
              onClick: closeModal,
            },
          ]}
        />
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
