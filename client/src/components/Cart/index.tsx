import { colors, shadows } from 'style/constants';
import mixin from 'style/mixin';
import styled from 'styled-components';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CartMenuList from './CartMenuList';
import CartInfo from './CartInfo';
import CartUtils from './CartUtils';

export default function Cart() {
  return (
    <CartWrapper>
      <CartTitle>
        <ShoppingCartOutlinedIcon color="primary" fontSize="medium" />
        <h2>주문내역</h2>
      </CartTitle>
      <CartMenuList />
      <CartInfo />
      <CartUtils />
    </CartWrapper>
  );
}

const CartWrapper = styled.div`
  width: 40%;
  background-color: ${colors.offWhite};
  margin-right: 1rem;
  box-shadow: ${shadows.default};
  ${mixin.flexMixin({ direction: 'column' })}
`;

const CartTitle = styled.div`
  width: 100%;
  border-bottom: 3px solid ${colors.line};
  padding: 1rem 0 0.5rem 0;
  gap: 0.5rem;
  ${mixin.flexMixin({ justify: 'center', align: 'center' })}

  & h2 {
    margin-top: 0.25rem;
    font-size: 1.375rem;
    font-weight: 700;
  }
`;
