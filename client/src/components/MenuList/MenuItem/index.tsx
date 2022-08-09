import styled from 'styled-components';
import { colors, shadows } from 'style/constants';
import { IMenu } from 'types';
import mixin from 'style/mixin';
import { useState } from 'react';
import MenuThumbnail from 'components/common/MenuThumbnail';
import MenuChoiceModal from './MenuChoiceModal';

export default function MenuItem({
  id,
  name,
  basePrice,
  imgUrl,
  isSoldOut,
}: IMenu) {
  const [isChoiceModalOpened, setIsChoiceModalOpened] = useState(false);

  const selectMenu = () => {
    if (isSoldOut) return;
    setIsChoiceModalOpened(true);
  };

  return (
    <>
      <MenuItemContainer onClick={selectMenu}>
        {isSoldOut && (
          <SoldOutSkin>
            <SoldOutMessage>SOLD OUT</SoldOutMessage>
          </SoldOutSkin>
        )}
        <MenuThumbnail size="M" imgUrl={imgUrl} />
        <MenuTitle>{name}</MenuTitle>
      </MenuItemContainer>
      <MenuChoiceModal
        id={id}
        name={name}
        basePrice={basePrice}
        imgUrl={imgUrl}
        isSoldOut={isSoldOut}
        closeModal={() => setIsChoiceModalOpened(false)}
      />
    </>
  );
}

const MenuItemContainer = styled.li`
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

const MenuTitle = styled.span`
  font-weight: 600;
`;
