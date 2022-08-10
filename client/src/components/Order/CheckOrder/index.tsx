import Container from 'components/common/Container';
import CustomModal from 'components/Modal';
import CommonModalButtons from 'components/Modal/CommonModalButtons';
import CommonModalHeader from 'components/Modal/CommonModalHeader';
import { useCartStateContext } from 'store/cart/cartContext';
import { colors } from 'style/constants';
import styled from 'styled-components';
import CheckOrderItem from './CheckOrderItem';

export interface IOrderStageModalProps {
  closeModal: () => void;
}

export default function CheckOrder({ closeModal }: IOrderStageModalProps) {
  const cartState = useCartStateContext();

  return (
    <CustomModal>
      <Container width="100%">
        <CommonModalHeader>
          <h2>주문 내역을 확인해주세요.</h2>
        </CommonModalHeader>
        <CheckOrderWrapper>
          {cartState.map((cartItem) => (
            <CheckOrderItem
              key={`${cartItem.id}_${JSON.stringify(cartItem.choices)}`}
              cartItem={cartItem}
            />
          ))}
        </CheckOrderWrapper>
        <CommonModalButtons
          buttonInfos={[
            { text: '이전', buttonColor: colors.darkGrey, onClick: closeModal },
            {
              text: '결제하기',
              buttonColor: colors.primary,
              onClick: closeModal,
            },
          ]}
        />
      </Container>
    </CustomModal>
  );
}

const CheckOrderWrapper = styled.div``;
