import styled from 'styled-components';
import { colors, shadows } from 'style/constants';
import { IMenu } from 'types';
import mixin from 'style/mixin';
import { useState } from 'react';
import MenuThumbnail from 'components/common/MenuThumbnail';
import MenuChoiceModal from './MenuChoiceModal';
import RankingMarker from './RankingMarker';

interface IMenuItemProps extends IMenu {
  ranking: number;
}

export default function MenuItem({
  id,
  name,
  basePrice,
  imgUrl,
  isSoldOut,
  ranking,
}: IMenuItemProps) {
  const [isChoiceModalOpened, setIsChoiceModalOpened] = useState(false);

  const selectMenu = () => {
    if (isSoldOut) return;
    setIsChoiceModalOpened(true);
  };

  return (
    <>
      <MenuItemContainer onClick={selectMenu}>
        <FadeInBox>
          <MenuThumbnail size="M" imgUrl={imgUrl} />
          <MenuTitle>{name}</MenuTitle>
        </FadeInBox>
        {isSoldOut && (
          <SoldOutSkin>
            <SoldOutMessage>SOLD OUT</SoldOutMessage>
          </SoldOutSkin>
        )}
        <RankingMarker ranking={ranking} />
      </MenuItemContainer>
      {isChoiceModalOpened && (
        <MenuChoiceModal
          id={id}
          name={name}
          basePrice={basePrice}
          imgUrl={imgUrl}
          isSoldOut={isSoldOut}
          closeModal={() => setIsChoiceModalOpened(false)}
        />
      )}
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
  overflow: hidden;
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
  display: table-cell;
  font-weight: 600;
  text-align: center;
  padding: 0 1rem 1rem 1rem;
`;

const FadeInBox = styled.div`
  position: absolute;
  ${mixin.flexMixin({ direction: 'column', align: 'center' })}
  gap: 1rem;
  animation: fadeIn 1s forwards;

  @keyframes fadeIn {
    from {
      top: 100%;
      opacity: 0;
    }
    to {
      top: 10%;
      opacity: 1;
    }
  }
`;
