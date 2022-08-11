import mixin from 'style/mixin';
import { css } from 'styled-components';
import { colors } from 'style/constants';
import Container from 'components/common/Container';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {
  useCartDispatchContext,
  useCartStateContext,
} from 'store/cart/cartContext';
import { usePageDispatchContext } from 'store/page/pageContext';
import { useState } from 'react';
import OrderModal from 'components/Order';
import CustomButton from 'components/common/CustomButton';

export default function CartUtils() {
  const dispatchPage = usePageDispatchContext();
  const dispatchCart = useCartDispatchContext();
  const cleanCart = () => {
    dispatchCart({ type: 'DELETE_ALL' });
  };
  const moveToEntrancePage = () => {
    cleanCart();
    dispatchPage('ENTRANCE');
  };
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const cartState = useCartStateContext();

  return (
    <>
      <Container flexInfo={{ direction: 'column' }} gap={0.125} width="100%">
        <Container flexInfo={{ align: 'center' }} gap={0.125} width="100%">
          <CustomButton
            buttonColor={colors.tertiary}
            onClick={cleanCart}
            style={DeleteButtonStyle}
          >
            <DeleteOutlinedIcon />
          </CustomButton>
          <CustomButton
            buttonColor={colors.primary}
            onClick={() => setIsOrderModalOpen(true)}
            disabled={!cartState.length}
            style={CommonCartButtonStyle}
          >
            주문하기
          </CustomButton>
        </Container>
        <CustomButton
          buttonColor={colors.darkGrey}
          onClick={moveToEntrancePage}
          style={CommonCartButtonStyle}
        >
          처음으로
        </CustomButton>
      </Container>
      {isOrderModalOpen && (
        <OrderModal closeModal={() => setIsOrderModalOpen(false)} />
      )}
    </>
  );
}

const CommonCartButtonStyle = css`
  ${mixin.flexMixin({ justify: 'center', align: 'center' })}
  width: 100%;
  padding: 1.125rem 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${colors.offWhite};
`;

const DeleteButtonStyle = css`
  ${CommonCartButtonStyle}
  width: 25%;
`;
