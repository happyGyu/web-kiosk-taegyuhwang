import React from 'react';
import styled from 'styled-components';
import { IMenu } from 'types';
import mixin from 'style/mixin';
import { colors } from 'style/constants';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import Squircle from 'components/common/Squircle';

export default function CartMenuItem() {
  return (
    <MenuItemWrapper>
      <MenuImage imgUrl="https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[30]_20210415144252244.jpg" />
      <MenuItemInfoArea>
        <MenuTitle>레몬셔벗에이드</MenuTitle>
        <DeleteButton>
          <ClearSharpIcon fontSize="small" />
        </DeleteButton>
        <QuantityUtils>
          <CircleButton
            color={colors.placeholder}
            width="1.75rem"
            height="1.75rem"
          >
            <RemoveSharpIcon />
          </CircleButton>
          <span>1</span>
          <CircleButton
            color={colors.placeholder}
            width="1.75rem"
            height="1.75rem"
          >
            <AddSharpIcon />
          </CircleButton>
        </QuantityUtils>
        <Price>6,500원</Price>
      </MenuItemInfoArea>
    </MenuItemWrapper>
  );
}

const MenuItemWrapper = styled.div`
  padding: 0.75rem 0;
  width: 100%;
  height: 6.5rem;
  border-bottom: 3px solid ${colors.line};
  ${mixin.flexMixin({ align: 'center' })}
  gap: 1rem;

  :last-child {
    border-bottom: 3px solid ${colors.secondary};
  }
`;

const MenuImage = styled.img<{ imgUrl: IMenu['imgUrl'] }>`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  content: url(${({ imgUrl }) => imgUrl});
`;

const MenuItemInfoArea = styled.div`
  flex-grow: 1;
  height: 100%;
  position: relative;
`;

const MenuTitle = styled.h3`
  position: absolute;
  top: 0.125rem;
  left: 0;
  font-size: 1.125rem;
  font-weight: 500;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  color: ${colors.darkGrey};
`;

const QuantityUtils = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  ${mixin.flexMixin({ align: 'center' })}

  & span {
    width: 2rem;
    text-align: center;
    font-size: 1.125rem;
    font-weight: 600;
  }
`;

const Price = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 1.125rem;
  font-weight: 600;
`;

const CircleButton = styled(Squircle)`
  ${mixin.flexMixin({ justify: 'center', align: 'center' })}
  border-radius: 100%;
  border: 2px solid ${colors.placeholder};
`;
