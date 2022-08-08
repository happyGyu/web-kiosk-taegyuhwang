import { Dispatch } from 'react';
import styled from 'styled-components';
import { colors, shadows } from 'style/constants';
import kioskStore from 'store/kiosk';
import { IMenuCategory } from 'types';
import MenuCategoryItem from './MenuCategoryItem';

type CategoryIdType = IMenuCategory['id'];
interface IMenuCategoryNavProps {
  currentCategoryId: CategoryIdType;
  setCurrentCategoryId: Dispatch<CategoryIdType>;
}

export default function MenuCategoryNav({
  currentCategoryId,
  setCurrentCategoryId,
}: IMenuCategoryNavProps) {
  const categories = kioskStore.get('categories');

  const handleCategoryItemClick = (categoryId: CategoryIdType) => {
    setCurrentCategoryId(categoryId);
  };

  return (
    <CategoryTab>
      <CategoryList>
        {categories?.map(({ id: categoryId, name: categoryName }) => (
          <MenuCategoryItem
            key={categoryId}
            isCurrentCategory={categoryId === currentCategoryId}
            id={categoryId}
            name={categoryName}
            categoryItemClickHandler={handleCategoryItemClick}
          />
        ))}
      </CategoryList>
    </CategoryTab>
  );
}

const CategoryTab = styled.nav`
  margin: 1rem;
  background: ${colors.offWhite};
  box-shadow: ${shadows.default};
`;

const CategoryList = styled.ul`
  display: flex;
  font-size: 1.5rem;
  font-weight: 700;
  background-color: ${colors.offWhite};
`;
