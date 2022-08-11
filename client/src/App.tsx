import styled from 'styled-components';
import GlobalStyle from 'style/GlobalStyle';
import { colors, shadows } from 'style/constants';
import MainPage from 'pages/MainPage';
import EntrancePage from 'pages/EntrancePage';
import { usePageContext } from 'store/page/pageContext';
import { useEffect, useRef } from 'react';
import portalStore from 'store/portal';

export default function App() {
  const currentPageType = usePageContext();
  const displayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!displayRef.current) return;
    portalStore.setPortalRoot(displayRef.current);
  }, []);

  return (
    <>
      <GlobalStyle />
      <KioskMachine>
        <Display ref={displayRef}>
          {currentPageType === 'ENTRANCE' && <EntrancePage />}
          {currentPageType === 'MAIN' && <MainPage />}
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
