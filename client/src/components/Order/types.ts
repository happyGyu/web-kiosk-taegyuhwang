export type TOrderStage =
  | 'CHECK_ORDER'
  | 'CHOOSE_PAYMENT_METHOD'
  | 'PAY_BY_CARD'
  | 'PAY_BY_CASH'
  | 'SHOW_BILL';

export interface IOrderModalProps {
  closeModal: () => void;
  moveStage: (stage: TOrderStage) => void;
}

export type TPaymentMethod = 'CARD' | 'CASH';
