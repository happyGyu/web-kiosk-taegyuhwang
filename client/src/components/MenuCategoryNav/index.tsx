import React, { useState } from 'react';
import styled from 'styled-components';
import { colors, shadows } from 'style/constants';
import { IMenuCategory } from 'types';
import MenuCategoryItem from './MenuCategoryItem';

const dummyMenuCategories = [
  { categoryId: 1, categoryName: '에스프레소' },
  { categoryId: 2, categoryName: '티' },
  { categoryId: 3, categoryName: '주스' },
  { categoryId: 4, categoryName: '아이스크림' },
  { categoryId: 5, categoryName: '디카페인' },
];

export default function MenuCategoryNav() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const handleCategoryItemClick = (categoryId: IMenuCategory['categoryId']) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <CategoryTab>
      <CategoryList>
        {dummyMenuCategories.map(({ categoryId, categoryName }) => (
          <MenuCategoryItem
            key={categoryId}
            isCurrentCategory={categoryId === selectedCategoryId}
            categoryId={categoryId}
            categoryName={categoryName}
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
