import { useState } from 'react';
import CheckOrderStage from './CheckOrderStage';
import ChoosePaymentMethodStage from './ChoosePaymentMethodStage';

type TOrderStage = 'CHECK_ORDER' | 'CHOOSE_PAYMENT_METHOD';
//   | 'HANDLE_CARD_PAY'
//   | 'PAY_BY_CASH'
//   | 'SHOW_BILL';

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
      <CheckOrderStage
        closeModal={closeModal}
        moveNext={() => moveStage('CHOOSE_PAYMENT_METHOD')}
      />
    ),
    CHOOSE_PAYMENT_METHOD: <ChoosePaymentMethodStage />,
  };

  return modalElements[orderStage];
}
