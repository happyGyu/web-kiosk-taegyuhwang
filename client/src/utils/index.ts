import { IChoice } from '../types/index';

export function formatMoneyString(money: number) {
  return `${money.toLocaleString()} 원`;
}

export function makeChoiceSummary(choices: IChoice[]) {
  return choices.map((choice) => choice.name).join(' / ');
}
