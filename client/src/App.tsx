import React from 'react';
import styled from 'styled-components';
import GlobalStyle from 'style/GlobalStyle';
import colors from 'constants/colors';
import MainPage from 'pages/MainPage';
import mixin from 'style/mixin';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <KioskMachine>
        <Display>
          <MainPage />
        </Display>
      </KioskMachine>
    </>
  );
}

const KioskMachine = styled.div`
  background: black;
  padding: 4rem;
  width: 960px;
  height: 1440px;
  margin: 5rem auto;
  border-radius: 3rem;
`;

const Display = styled.div`
  ${mixin.flexMixin({ direction: 'column', align: 'space-around' })}
  position: relative;
  height: 100%;
  background: ${colors.background};
  padding: 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 4px 20px rgba(0, 0, 0, 0.1);
`;
