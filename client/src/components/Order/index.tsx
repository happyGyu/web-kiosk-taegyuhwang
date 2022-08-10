import CustomModal from 'components/Modal';
import CommonModalHeader from 'components/Modal/CommonModalHeader';
import { useState } from 'react';
import mixin from 'style/mixin';
import styled from 'styled-components';
import { PostOrderApiResponseDto } from 'types';
import CheckOrderStage from './CheckOrderStage';
import ChoosePaymentMethodStage from './ChoosePaymentMethodStage';
import InputCashStage from './InputCashStage';
import PayMoneyStage from './PayMoneyStage';
import ShowBillStage from './ShowBillStage';
import { TOrderStage } from './types';

export interface IOrderStageModalProps {
  closeModal: () => void;
}

export default function OrderModal({ closeModal }: IOrderStageModalProps) {
  const [orderStage, setOrderState] = useState<TOrderStage>('CHECK_ORDER');
  const [orderResult, setOrderResult] =
    useState<PostOrderApiResponseDto | null>(null);
  const moveStage = (stageName: TOrderStage) => {
    setOrderState(stageName);
  };

  const modalInfos = {
    CHECK_ORDER: {
      title: '주문을 확인해주세요.',
      contents: (
        <CheckOrderStage closeModal={closeModal} moveStage={moveStage} />
      ),
    },
    CHOOSE_PAYMENT_METHOD: {
      title: '결제 수단을 선택해주세요.',
      contents: (
        <ChoosePaymentMethodStage
          closeModal={closeModal}
          moveStage={moveStage}
        />
      ),
    },
    INPUT_CASH: {
      title: '현금을 투입해주세요.',
      contents: (
        <InputCashStage closeModal={closeModal} moveStage={moveStage} />
      ),
    },

    PAY_BY_CARD: {
      title: '결제를 진행 중 입니다.',
      contents: (
        <PayMoneyStage
          closeModal={closeModal}
          moveStage={moveStage}
          paymentMethodName="CARD"
          setOrderResult={setOrderResult}
        />
      ),
    },
    PAY_BY_CASH: {
      title: '현금을 투입해주세요.',
      contents: (
        <PayMoneyStage
          closeModal={closeModal}
          moveStage={moveStage}
          paymentMethodName="CASH"
          setOrderResult={setOrderResult}
        />
      ),
    },
    SHOW_BILL: {
      title: '주문 결과를 확인해주세요.',
      contents: (
        <ShowBillStage closeModal={closeModal} orderResult={orderResult} />
      ),
    },
  };

  return (
    <CustomModal closeModal={closeModal}>
      <CommonModalHeader>
        <h2>{modalInfos[orderStage].title}</h2>
      </CommonModalHeader>
      <ContentWrapper>{modalInfos[orderStage].contents}</ContentWrapper>
    </CustomModal>
  );
}

const ContentWrapper = styled.div`
  width: 100%;
  ${mixin.flexMixin({ direction: 'column', justify: 'space-between' })}
  padding: 3rem 5rem;
  height: 50rem;
`;
