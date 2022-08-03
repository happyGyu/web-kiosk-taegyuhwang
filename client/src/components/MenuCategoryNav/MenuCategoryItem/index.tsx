import React from 'react';
import styled, { css } from 'styled-components';
import colors from 'constants/colors';
import { IMenuCategory } from 'types';

interface IMenuCategoryItemProps extends IMenuCategory {
  isCurrentCategory: boolean;
  categoryItemClickHandler: (id: number) => void;
}

export default function MenuCategoryItem({
  isCurrentCategory,
  categoryId,
  categoryName,
  categoryItemClickHandler,
}: IMenuCategoryItemProps) {
  return (
    <CategoryListItem
      onClick={() => categoryItemClickHandler(categoryId)}
      selected={isCurrentCategory}
    >
      {categoryName}
    </CategoryListItem>
  );
}

const CategoryListItem = styled.li<{ selected: boolean }>`
  padding: 1.5rem 0;
  width: 20%;
  text-align: center;
  ${({ selected }) =>
    selected &&
    css`
      background: ${colors.primary};
      color: ${colors.offWhite};
    `}
`;
