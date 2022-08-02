import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../constants/colors';
import MenuCategoryItem from './MenuCategoryItem';
import { IMenuCategory } from '../../types';
import mixin from '../../style/mixin';

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
  margin-top: 50%;
  background: ${colors.offWhite};
`;

const CategoryList = styled.ul`
  ${mixin.flexMixin({})}
  font-size: 1.5rem;
  font-weight: 700;
`;
