import React from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';

const dummyMenuListData = [
  {
    id: 1,
    name: '에스프레소 콘 파나',
    basePrice: 4500,
    imgUrl:
      'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[30]_20210415144252244.jpg',
    isSoldOut: false,
  },
  {
    id: 2,
    name: '카페라뗴',
    basePrice: 5000,
    imgUrl:
      'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110563]_20210426095937808.jpg',
    isSoldOut: true,
  },
];

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
  height: 100%;
  overflow: auto;
`;
