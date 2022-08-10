import Container from 'components/common/Container';
import MenuThumbnail from 'components/common/MenuThumbnail';
import { colors } from 'style/constants';
import mixin from 'style/mixin';
import styled from 'styled-components';
import { ICartItem } from 'types';
import { makeChoiceSummary } from 'utils';

interface ICheckOrderItemProps {
  cartItem: ICartItem;
}

export default function CheckOrderItem({ cartItem }: ICheckOrderItemProps) {
  return (
    <Container>
      <MenuThumbnail size="S" imgUrl={cartItem.imgUrl} />
      <OrderMenuInfo>
        <MenuName>{cartItem.name}</MenuName>
        <MenuChoices>{makeChoiceSummary(cartItem.choices)}</MenuChoices>
      </OrderMenuInfo>
    </Container>
  );
}

const OrderMenuInfo = styled.div`
  ${mixin.flexMixin({ direction: 'column' })}
`;

const MenuName = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
`;

const MenuChoices = styled.span`
  color: ${colors.placeholder};
`;
