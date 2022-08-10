import { CartStateType } from '../store/cart/cartContext';
import { IChoice } from '../types/index';

export function formatMoneyString(money: number) {
  return `${money.toLocaleString()} 원`;
}

export function makeChoiceSummary(choices: IChoice[]) {
  return choices
    .reduce(
      (summary, choice) => (choice ? `${summary} / ${choice?.name}` : summary),
      ''
    )
    .slice(2);
}

export function calculateTotalAmountOfCart(cartState: CartStateType): {
  totalQuantity: number;
  totalPrice: number;
} {
  return cartState.reduce(
    (amounts, cartItem) => {
      const newAmounts = { ...amounts };
      newAmounts.totalQuantity += cartItem.quantity;
      newAmounts.totalPrice += cartItem.totalPricePerEach * cartItem.quantity;
      return newAmounts;
    },
    { totalQuantity: 0, totalPrice: 0 }
  );
}
