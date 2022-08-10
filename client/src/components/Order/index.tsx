import CustomModal from 'components/Modal';
import CommonModalHeader from 'components/Modal/CommonModalHeader';
import { useState } from 'react';
import mixin from 'style/mixin';
import styled from 'styled-components';
import CheckOrderStage from './CheckOrderStage';
import ChoosePaymentMethodStage from './ChoosePaymentMethodStage';
import PayByCardStage from './PayByCardStage';
import { TOrderStage } from './types';

export interface IOrderStageModalProps {
  closeModal: () => void;
}

export default function OrderModal({ closeModal }: IOrderStageModalProps) {
  const [orderStage, setOrderState] = useState<TOrderStage>('CHECK_ORDER');

  const moveStage = (stageName: TOrderStage) => {
    setOrderState(stageName);
  };

  const modalContents = {
    CHECK_ORDER: (
      <CheckOrderStage closeModal={closeModal} moveStage={moveStage} />
    ),
    CHOOSE_PAYMENT_METHOD: (
      <ChoosePaymentMethodStage closeModal={closeModal} moveStage={moveStage} />
    ),
    PAY_BY_CARD: (
      <PayByCardStage closeModal={closeModal} moveStage={moveStage} />
    ),
    PAY_BY_CASH: (
      <CheckOrderStage closeModal={closeModal} moveStage={moveStage} />
    ),
    SHOW_BILL: (
      <CheckOrderStage closeModal={closeModal} moveStage={moveStage} />
    ),
  };

  return (
    <CustomModal>
      <CommonModalHeader>
        <h2>결제 수단을 선택해주세요.</h2>
      </CommonModalHeader>
      <ContentWrapper>{modalContents[orderStage]}</ContentWrapper>
    </CustomModal>
  );
}

const ContentWrapper = styled.div`
  width: 100%;
  ${mixin.flexMixin({ direction: 'column', justify: 'space-between' })}
  padding: 3rem 5rem;
  height: 50rem;
`;
