import mixin from 'style/mixin';
import styled, { css } from 'styled-components';
import { colors } from 'style/constants';
import Container from 'components/common/Container';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useCartDispatchContext } from 'store/cart/cartContext';
import { usePageDispatchContext } from 'store/page/pageContext';
import { useState } from 'react';
import OrderModal from 'components/Order';

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

  return (
    <>
      <Container flexInfo={{ direction: 'column' }} gap={0.125} width="100%">
        <Container flexInfo={{ align: 'center' }} gap={0.125} width="100%">
          <CustomButton
            width="25%"
            backgroundColor={colors.tertiary}
            onClick={cleanCart}
          >
            <DeleteOutlinedIcon />
          </CustomButton>
          <CustomButton
            backgroundColor={colors.primary}
            onClick={() => setIsOrderModalOpen(true)}
          >
            주문하기
          </CustomButton>
        </Container>
        <CustomButton
          backgroundColor={colors.darkGrey}
          onClick={moveToEntrancePage}
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

const CustomButton = styled.button<{
  width?: string;
  backgroundColor: string;
}>`
  ${mixin.flexMixin({ justify: 'center', align: 'center' })}
  ${({ width, backgroundColor }) => css`
    width: ${width || '100%'};
    background-color: ${backgroundColor};
  `}
  padding: 1.125rem 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${colors.offWhite};
`;
