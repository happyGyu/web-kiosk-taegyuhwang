import { colors } from 'style/constants';
import mixin from 'style/mixin';
import styled from 'styled-components';

interface IShowBillStageProps {
  closeModal: () => void;
}

export default function ShowBillStage({ closeModal }: IShowBillStageProps) {
  return (
    <>
      <OrderNumber>주문번호 22번</OrderNumber>
      <SoldMenuWrapper>
        <SoldMenu>
          <OrderMenuInfo>
            <MenuName>라떼</MenuName>
            <MenuChoices>아이스 / 히히</MenuChoices>
          </OrderMenuInfo>
          <MenuPrice>1,000원</MenuPrice>
        </SoldMenu>
      </SoldMenuWrapper>
    </>
  );
}

const OrderNumber = styled.span`
  font-size: 2rem;
  font-weight: 600;
`;

const SoldMenuWrapper = styled.ul``;
const SoldMenu = styled.li``;
const OrderMenuInfo = styled.div`
  margin-left: 2rem;
  flex-grow: 1;
  ${mixin.flexMixin({ direction: 'column', justify: 'space-around' })}
`;

const MenuName = styled.span`
  margin-top: 0.5rem;
  font-size: 1.5rem;
  font-weight: 500;
`;

const MenuChoices = styled.span`
  font-size: 1.25rem;
  color: ${colors.placeholder};
`;

const MenuPrice = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
`;
