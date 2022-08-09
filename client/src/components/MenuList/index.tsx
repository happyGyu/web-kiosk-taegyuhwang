import useAxios from 'hooks/useAxios';
import policy from 'policy';
import { useEffect, useState } from 'react';
import kioskStore from 'store/kiosk';
import { colors } from 'style/constants';
import mixin from 'style/mixin';
import styled from 'styled-components';
import { CategoryIdType, GetSalesStatApiResponseDto, MenuIdType } from 'types';
import MenuItem from './MenuItem';

interface IMenuListProps {
  currentCategoryId: CategoryIdType;
}

export default function MenuList({ currentCategoryId }: IMenuListProps) {
  const [salesRankers, setSalesRankers] = useState<MenuIdType[]>([]);

  const { data: salesStat } = useAxios<GetSalesStatApiResponseDto>(
    `/menus/ranking?category-id=${currentCategoryId}`
  );

  const getCurrentCategoryMenus = () => {
    const { menusGroupByCategory } = kioskStore.data;
    return menusGroupByCategory.find((data) => data.id === currentCategoryId)
      ?.menus;
  };

  const getRankerBoard = (salesData: GetSalesStatApiResponseDto) => {
    const rankRange = policy.RANKING_RANGE;
    const sortedSalesData = salesData.sort(
      (a, b) => b.totalSoldQuantity - a.totalSoldQuantity
    );
    const rankerBoard = sortedSalesData.map((menu) => menu.id);
    return rankerBoard.splice(0, rankRange);
  };

  const checkMenuRank = (menuId: number) => salesRankers.indexOf(menuId) + 1;

  useEffect(() => {
    if (!salesStat) return;
    const rankerBoard = getRankerBoard(salesStat);
    setSalesRankers(rankerBoard);
  }, [salesStat]);

  return (
    <ItemList>
      {getCurrentCategoryMenus()?.map(
        ({ id, name, basePrice, imgUrl, isSoldOut }) => {
          const ranking = checkMenuRank(id);
          return (
            <MenuItem
              key={id}
              id={id}
              name={name}
              basePrice={basePrice}
              imgUrl={imgUrl}
              isSoldOut={isSoldOut}
              ranking={ranking}
            />
          );
        }
      )}
    </ItemList>
  );
}

const ItemList = styled.ul`
  position: relative;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  width: 60%;
  overflow: auto;
  margin-left: 1rem;
`;
