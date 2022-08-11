import { useCartStateContext } from 'store/cart/cartContext';
import styled from 'styled-components';
import CartMenuItem from './CartMenuItem';

export default function CartMenuList() {
  const cartState = useCartStateContext();
  return (
    <CartMenuListWrapper>
      {cartState.map((cartItem, cartItemIdx) => (
        <CartMenuItem
          key={`${cartItem.id}_${JSON.stringify(cartItem.choices)}`}
          cartItem={cartItem}
          cartItemIdx={cartItemIdx}
        />
      ))}
    </CartMenuListWrapper>
  );
}

const CartMenuListWrapper = styled.ul`
  flex-grow: 1;
  padding: 0 1.25rem;
  width: 100%;
  overflow: scroll;
`;
