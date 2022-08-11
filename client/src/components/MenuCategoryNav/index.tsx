import { Dispatch } from 'react';
import styled from 'styled-components';
import { colors, shadows } from 'style/constants';
import kioskStore from 'store/kiosk';
import { CategoryIdType } from 'types';
import DragSlider from 'components/common/DragSlider';
import MenuCategoryItem from './MenuCategoryItem';

interface ICategoryNavProps {
  currentCategoryId: CategoryIdType;
  setCurrentCategoryId: Dispatch<CategoryIdType>;
}

export default function MenuCategoryNav({
  currentCategoryId,
  setCurrentCategoryId,
}: ICategoryNavProps) {
  const { categories } = kioskStore.data;

  const handleCategoryItemClick = ({
    target,
  }: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const categoryId = (target as HTMLLIElement).getAttribute('data-id');
    if (!categoryId) return;
    setCurrentCategoryId(+categoryId);
  };

  return (
    <CategoryTab>
      <DragSlider height="4.5rem" onClick={handleCategoryItemClick}>
        <CategoryList>
          {categories?.map(({ id: categoryId, name: categoryName }) => (
            <MenuCategoryItem
              key={categoryId}
              isCurrentCategory={categoryId === currentCategoryId}
              id={categoryId}
              name={categoryName}
            />
          ))}
        </CategoryList>
      </DragSlider>
    </CategoryTab>
  );
}

const CategoryTab = styled.nav`
  margin: 1rem;
  width: calc(100% - 2rem);
  overflow: hidden;
  background: ${colors.offWhite};
  box-shadow: ${shadows.default};
`;

const CategoryList = styled.ul`
  display: flex;
  font-size: 1.5rem;
  font-weight: 700;
  background-color: ${colors.offWhite};
`;
