import { useState } from 'react';
import styled from 'styled-components';
import { colors, shadows } from 'style/constants';
import { IMenuCategory } from 'types';
import MenuCategoryItem from './MenuCategoryItem';

const dummyMenuCategories = [
  { id: 1, name: '에스프레소' },
  { id: 2, name: '티' },
  { id: 3, name: '주스' },
  { id: 4, name: '아이스크림' },
  { id: 5, name: '디카페인' },
];

export default function MenuCategoryNav() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const handleCategoryItemClick = (categoryId: IMenuCategory['id']) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <CategoryTab>
      <CategoryList>
        {dummyMenuCategories.map(({ id: categoryId, name: categoryName }) => (
          <MenuCategoryItem
            key={categoryId}
            isCurrentCategory={categoryId === selectedCategoryId}
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
