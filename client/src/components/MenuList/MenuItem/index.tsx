import React from 'react';
import styled from 'styled-components';
import { colors, shadows } from 'style/constants';
import { IMenu } from 'types';
import mixin from 'style/mixin';

export default function MenuItem({ id, name, imgUrl, isSoldOut }: IMenu) {
  return (
    <MenuItemContainer isSoldOut={isSoldOut}>
      {isSoldOut && (
        <SoldOutSkin>
          <SoldOutMessage>SOLD OUT</SoldOutMessage>
        </SoldOutSkin>
      )}
      <MenuImage imgUrl={imgUrl} />
      <MenuTitle>{name}</MenuTitle>
    </MenuItemContainer>
  );
}

const MenuItemContainer = styled.li<{ isSoldOut: IMenu['isSoldOut'] }>`
  position: relative;
  ${mixin.flexMixin({
    direction: 'column',
    justify: 'space-between',
    align: 'center',
  })}

  gap: 1rem;
  width: calc((100% - 2rem) / 3);
  height: 12rem;
  padding: 1rem 0;
  background: ${colors.offWhite};
  border-radius: 0.5rem;
  box-shadow: ${shadows.default};
`;

const SoldOutSkin = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(200, 200, 200, 0.7);
  border-radius: 0.5rem;
  ${mixin.flexMixin({ justify: 'center', align: 'center' })}
`;

const SoldOutMessage = styled.span`
  color: ${colors.secondary};
  font-weight: 700;
  font-size: 1.5rem;
`;

const MenuImage = styled.img<{ imgUrl: IMenu['imgUrl'] }>`
  max-width: 75%;
  max-height: 75%;
  border-radius: 50%;
  content: url(${({ imgUrl }) => imgUrl});
`;

const MenuTitle = styled.span`
  font-weight: 600;
`;
