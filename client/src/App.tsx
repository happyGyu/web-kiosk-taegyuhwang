import styled from 'styled-components';
import GlobalStyle from 'style/GlobalStyle';
import { colors, shadows } from 'style/constants';

import MainPage from 'pages/MainPage';

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
  background: ${colors.titleActive};
  padding: 4rem;
  width: 960px;
  height: 1440px;
  margin: 5rem auto;
  border-radius: 2rem;
  box-shadow: ${shadows.default};
`;

const Display = styled.div`
  position: relative;
  height: 100%;
  background: ${colors.background};
`;
