import { CartActionType, CartStateType } from './cartContext';

function findTargetItemIdx(targetMenuId: number, cartState: CartStateType) {
  const targetMenu = cartState.find((cartItem) => cartItem.id === targetMenuId);
  if (!targetMenu) throw new Error('Something wrong: Invalid menu id');
  return cartState.indexOf(targetMenu);
}

export default function cartReducer(
  state: CartStateType,
  action: CartActionType
): CartStateType {
  switch (action.type) {
    case 'DELETE': {
      const targetItemIdx = findTargetItemIdx(action.menuId, state);
      const newState = [...state];
      newState.splice(targetItemIdx, 1);
      return newState;
    }
    case 'CHANGE_QUANTITY': {
      const targetItemIdx = findTargetItemIdx(action.menuId, state);
      const newState = [...state];
      newState[targetItemIdx].quantity = action.quantity;
      return newState;
    }
    case 'UPDATE': {
      const targetItemIdx = findTargetItemIdx(action.itemData.id, state);
      const newState = [...state];
      newState[targetItemIdx] = action.itemData;
      return newState;
    }
    case 'ADD':
      return [...state, action.itemData];
    default:
      throw new Error('Invalid action');
  }
}
