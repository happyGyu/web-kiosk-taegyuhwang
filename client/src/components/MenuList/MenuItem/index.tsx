import React from 'react';
import styled from 'styled-components';
import colors from 'constants/colors';
import { IMenu } from 'types';
import mixin from 'style/mixin';

export default function MenuItem({
  id,
  name,
  basePrice,
  imgUrl,
  isSoldOut,
}: IMenu) {
  return (
    <MenuItemContainer isSoldOut={isSoldOut}>
      <MenuImage imgUrl={imgUrl} />
      <MenuTitle>{name}</MenuTitle>
    </MenuItemContainer>
  );
}

const MenuItemContainer = styled.li<{ isSoldOut: IMenu['isSoldOut'] }>`
  ${mixin.flexMixin({
    direction: 'column',
    justify: 'space-between',
    align: 'center',
  })}
  gap: 1rem;
  width: calc((100% - 2rem) / 3);
  height: 12rem;
  padding: 1rem 0 3rem 0;
  background: ${colors.offWhite};
  border: ${({ isSoldOut }) => (isSoldOut ? '2px solid red' : '')};
`;

const MenuImage = styled.img<{ imgUrl: IMenu['imgUrl'] }>`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  border-radius: 50%;
  content: url(${({ imgUrl }) => imgUrl});
`;

const MenuTitle = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
`;
