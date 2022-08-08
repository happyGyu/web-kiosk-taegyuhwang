import kioskStore from 'store/kiosk';
import styled from 'styled-components';
import { CategoryIdType } from 'types';
import MenuItem from './MenuItem';

interface IMenuListProps {
  currentCategoryId: CategoryIdType;
}

export default function MenuList({ currentCategoryId }: IMenuListProps) {
  const getCurrentCategoryMenus = () => {
    const { menusGroupByCategory } = kioskStore.data;
    return menusGroupByCategory.find((data) => data.id === currentCategoryId)
      ?.menus;
  };

  return (
    <ItemList>
      {getCurrentCategoryMenus()?.map(
        ({ id, name, basePrice, imgUrl, isSoldOut }) => (
          <MenuItem
            key={id}
            id={id}
            name={name}
            basePrice={basePrice}
            imgUrl={imgUrl}
            isSoldOut={isSoldOut}
          />
        )
      )}
    </ItemList>
  );
}

const ItemList = styled.ul`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  width: 60%;
  overflow: auto;
  margin-left: 1rem;
`;
