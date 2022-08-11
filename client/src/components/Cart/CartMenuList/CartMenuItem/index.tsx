import styled from 'styled-components';
import { ICartItem, IMenu } from 'types';
import mixin from 'style/mixin';
import { colors } from 'style/constants';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import Squircle from 'components/common/Squircle';
import { formatMoneyString } from 'utils';
import QuantityController from 'components/QuantityController';
import { useCartDispatchContext } from 'store/cart/cartContext';
import Container from 'components/common/Container';
import policy from 'policy';

export default function CartMenuItem({ cartItem }: { cartItem: ICartItem }) {
  const { id, name, imgUrl, price, quantity } = cartItem;
  const dispatchContext = useCartDispatchContext();
  const setQuantity = (newQuantity: number) => {
    dispatchContext({
      type: 'CHANGE_QUANTITY',
      menuId: id,
      quantity: newQuantity,
    });
  };

  const deleteMenu = () => {
    dispatchContext({
      type: 'DELETE',
      menuId: id,
    });
  };

  return (
    <MenuItemWrapper>
      <MenuImage imgUrl={imgUrl} />
      <MenuItemInfoArea>
        <MenuTitle>{name}</MenuTitle>
        <DeleteButton onClick={deleteMenu}>
          <ClearSharpIcon fontSize="small" />
        </DeleteButton>
        <Container position="absolute" bottom="0" left="0">
          <QuantityController
            quantity={quantity}
            setQuantity={setQuantity}
            min={policy.MIN_ORDER_QUANTITY}
            max={policy.MAX_ORDER_QUANTITY}
            size="S"
          />
        </Container>
        <Price>{formatMoneyString(price * quantity)}</Price>
      </MenuItemInfoArea>
    </MenuItemWrapper>
  );
}

const MenuItemWrapper = styled.li`
  padding: 0.75rem 0;
  width: 100%;
  height: 6.5rem;
  border-bottom: 3px solid ${colors.line};
  ${mixin.flexMixin({ align: 'center' })}
  gap: 1rem;

  :last-child {
    border-bottom: 3px solid ${colors.secondary};
  }
`;

const MenuImage = styled.img<{ imgUrl: IMenu['imgUrl'] }>`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  content: url(${({ imgUrl }) => imgUrl});
`;

const MenuItemInfoArea = styled.div`
  flex-grow: 1;
  height: 100%;
  position: relative;
`;

const MenuTitle = styled.h3`
  position: absolute;
  top: 0.125rem;
  left: 0;
  font-size: 1.125rem;
  font-weight: 500;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  color: ${colors.darkGrey};
`;

const Price = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 1.125rem;
  font-weight: 600;
`;

const CircleButton = styled(Squircle)`
  ${mixin.flexMixin({ justify: 'center', align: 'center' })}
  border-radius: 100%;
  border: 2px solid ${colors.placeholder};
`;
