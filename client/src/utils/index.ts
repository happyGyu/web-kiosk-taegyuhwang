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

type TAmountInfo = {
  quantity: number;
  price: number;
};

export function calculateTotalAmountOfCart(amountInfo: TAmountInfo[]): {
  totalQuantity: number;
  totalPrice: number;
} {
  return amountInfo.reduce(
    (amounts, amountPerProduct) => {
      const newAmounts = { ...amounts };
      const { quantity, price } = amountPerProduct;
      newAmounts.totalQuantity += quantity;
      newAmounts.totalPrice += price * quantity;
      return newAmounts;
    },
    { totalQuantity: 0, totalPrice: 0 }
  );
}
