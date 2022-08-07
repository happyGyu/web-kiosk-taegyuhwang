import React from 'react';
import styled from 'styled-components';
import dummyMenuListData from 'dummy/dummyMenu';
import MenuItem from './MenuItem';

export default function MenuList() {
  return (
    <ItemList>
      {dummyMenuListData.map(({ id, name, basePrice, imgUrl, isSoldOut }) => (
        <MenuItem
          key={id}
          id={id}
          name={name}
          basePrice={basePrice}
          imgUrl={imgUrl}
          isSoldOut={isSoldOut}
        />
      ))}
    </ItemList>
  );
}

const ItemList = styled.ul`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  width: 60%;
  overflow: auto;
  margin-left: 1rem;
`;
