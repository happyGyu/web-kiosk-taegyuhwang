import { useState } from 'react';
import CheckOrderStage from './CheckOrderStage';
import ChoosePaymentMethodStage from './ChoosePaymentMethodStage';
import { TOrderStage } from './types';

export interface IOrderStageModalProps {
  closeModal: () => void;
}

export default function OrderModal({ closeModal }: IOrderStageModalProps) {
  const [orderStage, setOrderState] = useState<TOrderStage>('CHECK_ORDER');

  const moveStage = (stageName: TOrderStage) => {
    setOrderState(stageName);
  };

  const modalElements = {
    CHECK_ORDER: (
      <CheckOrderStage closeModal={closeModal} moveStage={moveStage} />
    ),
    CHOOSE_PAYMENT_METHOD: (
      <ChoosePaymentMethodStage closeModal={closeModal} moveStage={moveStage} />
    ),
    PAY_BY_CARD: (
      <CheckOrderStage closeModal={closeModal} moveStage={moveStage} />
    ),
    PAY_BY_CASH: (
      <CheckOrderStage closeModal={closeModal} moveStage={moveStage} />
    ),
  };

  return modalElements[orderStage];
}
