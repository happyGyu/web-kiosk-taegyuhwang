import styled, { css } from 'styled-components';
import { colors } from 'style/constants';
import { ICategory } from 'types';

interface ICategoryItemProps extends ICategory {
  isCurrentCategory: boolean;
  categoryItemClickHandler: (id: number) => void;
}

export default function MenuCategoryItem({
  isCurrentCategory,
  id: categoryId,
  name: categoryName,
  categoryItemClickHandler,
}: ICategoryItemProps) {
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
  width: 10rem;
  text-align: center;
  ${({ selected }) =>
    selected &&
    css`
      background: ${colors.primary};
      color: ${colors.offWhite};
    `}
`;
