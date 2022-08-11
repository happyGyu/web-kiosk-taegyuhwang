import styled from 'styled-components';
import mixin from 'style/mixin';
import { colors } from 'style/constants';
import { formatMoneyString } from 'utils';

interface ITotalAmountProps {
  totalQuantity: number;
  totalPrice: number;
}

export default function TotalAmount({
  totalQuantity,
  totalPrice,
}: ITotalAmountProps) {
  return (
    <OrderStat>
      <Stat>
        총 수량 : <HighlightedStat>{totalQuantity}</HighlightedStat>
      </Stat>
      <Stat>
        총 금액 :{' '}
        <HighlightedStat>{formatMoneyString(totalPrice)}</HighlightedStat>
      </Stat>
    </OrderStat>
  );
}

const OrderStat = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  ${mixin.flexMixin({ justify: 'space-between', align: 'center' })}
`;

const Stat = styled.div`
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 500;
  ${mixin.flexMixin({ justify: 'space-between', align: 'center' })};
`;

const HighlightedStat = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.primary};
`;
