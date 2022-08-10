import { useState } from 'react';
import CheckOrder from './CheckOrder';

type TOrderStage = 'CHECK_ORDER';
//   | 'CHOOSE_PAYMENT_METHOD'
//   | 'HANDLE_CARD_PAY'
//   | 'PAY_BY_CASH'
//   | 'SHOW_BILL';

export interface IOrderStageModalProps {
  closeModal: () => void;
}

export default function OrderModal({ closeModal }: IOrderStageModalProps) {
  const [orderStage, setOrderState] = useState<TOrderStage>('CHECK_ORDER');
  const modalElements = {
    CHECK_ORDER: <CheckOrder closeModal={closeModal} />,
  };

  return modalElements[orderStage];
}
