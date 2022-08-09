import { useContext, createContext, Dispatch } from 'react';
import { ICartItem } from 'types';

type CartStateType = ICartItem[];
type CartActionType =
  | { type: 'INCREASE_QUANTITY'; menuId: number }
  | { type: 'DECREASE_QUANTITY'; menuId: number }
  | { type: 'DELETE'; menuId: number }
  | { type: 'UPDATE'; itemData: ICartItem }
  | { type: 'ADD'; itemData: ICartItem };

export const CartContext = createContext<CartStateType | null>(null);
export const CartDispatchContext =
  createContext<Dispatch<CartActionType> | null>(null);

export const useCartContext = () => {
  const pageContext = useContext(CartContext);
  if (!pageContext) throw new Error('Cannot use Cart provider');
  return pageContext;
};

export const useCartDispatchContext = () => {
  const dispatchCart = useContext(CartDispatchContext);
  if (!dispatchCart) throw new Error('Cannot use Cart provider');
  return dispatchCart;
};
