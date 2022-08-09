import { useContext, createContext, Dispatch } from 'react';
import { ICartItem } from 'types';

export type CartStateType = ICartItem[];
export type CartActionType =
  | { type: 'CHANGE_QUANTITY'; menuId: number; quantity: number }
  | { type: 'DELETE'; menuId: number }
  | { type: 'UPDATE'; itemData: ICartItem }
  | { type: 'ADD'; itemData: ICartItem }
  | { type: 'DELETE_ALL' };

export const CartStateContext = createContext<CartStateType | null>(null);
export const CartDispatchContext =
  createContext<Dispatch<CartActionType> | null>(null);

export const useCartStateContext = () => {
  const pageContext = useContext(CartStateContext);
  if (!pageContext) throw new Error('Cannot use Cart provider');
  return pageContext;
};

export const useCartDispatchContext = () => {
  const dispatchCart = useContext(CartDispatchContext);
  if (!dispatchCart) throw new Error('Cannot use Cart provider');
  return dispatchCart;
};
