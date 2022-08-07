import React from 'react';
import styled from 'styled-components';
import MenuCategoryNav from 'components/MenuCategoryNav';
import MenuList from 'components/MenuList';
import Cart from 'components/Cart';
import mixin from 'style/mixin';

export default function MainPage() {
  return (
    <PageWrapper>
      <Banner />
      <MenuCategoryNav />
      <Main>
        <MenuList />
        <Cart />
      </Main>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  ${mixin.flexMixin({
    direction: 'column',
    justify: 'space-between',
  })}
  height: 100%;
`;

const Banner = styled.img`
  top: 0;
  left: 0;
  width: 100%;
  height: 25%;
  content: url('https://images.unsplash.com/photo-1551418988-c21e451467b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3474&q=80');
`;

const Main = styled.div`
  width: 100%;
  height: 0%;
  display: flex;
  gap: 1rem;
  flex-grow: 1;
  margin-bottom: 1rem;
`;
