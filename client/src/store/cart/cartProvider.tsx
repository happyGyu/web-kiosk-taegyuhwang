import { useReducer } from 'react';
import { CartStateContext, CartDispatchContext } from './cartContext';
import cartReducer from './cartReducer';

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [storeState, dispatchStore] = useReducer(cartReducer, []);
  return (
    <CartStateContext.Provider value={storeState}>
      <CartDispatchContext.Provider value={dispatchStore}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}
