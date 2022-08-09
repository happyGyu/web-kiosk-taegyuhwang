import Container from 'components/common/Container';
import { useCartStateContext } from 'store/cart/cartContext';
import CartMenuItem from './CartMenuItem';

export default function CartMenuList() {
  const cartState = useCartStateContext();
  return (
    <Container flexGrow={1} padding="0 1.25rem" width="100%">
      {cartState.map((cartItem) => (
        <CartMenuItem
          key={`${cartItem.id}_${JSON.stringify(cartItem.choices)}`}
          cartItem={cartItem}
        />
      ))}
    </Container>
  );
}
