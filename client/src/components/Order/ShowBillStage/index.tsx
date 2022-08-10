import policy from 'policy';
import { useEffect, useState } from 'react';
import { colors } from 'style/constants';
import mixin from 'style/mixin';
import styled from 'styled-components';
import { PostOrderApiResponseDto } from 'types';
import { formatMoneyString } from 'utils';

interface IShowBillStageProps {
  closeModal: () => void;
  orderResult: PostOrderApiResponseDto | null;
}

export default function ShowBillStage({
  closeModal,
  orderResult,
}: IShowBillStageProps) {
  const [displayTime, setDisplaytime] = useState(policy.BILL_DISPLAYING_TIME);

  if (!orderResult) return <div>todo: 에러페이지</div>;

  const handleDisplayTime = (leftTime: number, timerId: NodeJS.Timer) => {
    if (leftTime > 0) return;
    clearInterval(timerId);
    closeModal();
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setDisplaytime((prev) => {
        const leftTime = prev - 1;
        handleDisplayTime(leftTime, timerId);
        return leftTime;
      });
    }, 1000);
  }, []);

  const { todayOrderNum, soldMenus } = orderResult.data;
  return (
    <>
      <OrderNumber>주문번호 {todayOrderNum}번</OrderNumber>
      <SoldMenuWrapper>
        {soldMenus.map((soldMenu) => {
          const { menuName, quantity, sales, choiceSummary } = soldMenu;
          return (
            <SoldMenu key={`${menuName}_${choiceSummary}`}>
              <MenuInfoWrapper>
                <MenuName>{menuName}</MenuName>
                <MenuChoices>
                  {JSON.parse(choiceSummary).join(' / ')}
                </MenuChoices>
              </MenuInfoWrapper>
              <SalesWrapper>
                <SoldQuantity>{quantity}개</SoldQuantity>
                <MenuPrice>{formatMoneyString(sales)}</MenuPrice>
              </SalesWrapper>
            </SoldMenu>
          );
        })}
      </SoldMenuWrapper>
      <AlertMessage>{displayTime}</AlertMessage>
    </>
  );
}

const OrderNumber = styled.span`
  margin: 0 auto;
  font-size: 2.5rem;
  font-weight: 700;
`;

const SoldMenuWrapper = styled.ul`
  width: 100%;
  margin-top: 3rem;
  flex-grow: 1;
`;

const SoldMenu = styled.li`
  width: 100%;
  padding: 1rem 0;
  ${mixin.flexMixin({ justify: 'space-between', align: 'center' })}
  border-bottom: 1px solid ${colors.darkGrey};
`;

const MenuInfoWrapper = styled.div`
  gap: 1rem;
  ${mixin.flexMixin({ direction: 'column' })}
`;

const SalesWrapper = styled.div`
  gap: 1rem;
  ${mixin.flexMixin({ direction: 'column', align: 'flex-end' })}
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

const SoldQuantity = styled.span`
  font-size: 1.5rem;
  font-weight: 400;
`;

const MenuPrice = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
`;

const AlertMessage = styled.span`
  ${colors.error}
`;
