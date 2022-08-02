import React from 'react';
import styled from 'styled-components';
import MenuCategoryNav from '../components/MenuCategoryNav';
import MenuList from '../components/MenuList';

export default function MainPage() {
  return (
    <>
      <Banner />
      <MenuCategoryNav />
      <Main>
        <MenuList />
      </Main>
    </>
  );
}

const Banner = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30%;
  content: url('https://images.unsplash.com/photo-1551418988-c21e451467b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3474&q=80');
`;

const Main = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  width: 100%;
  height: 61%;
`;
