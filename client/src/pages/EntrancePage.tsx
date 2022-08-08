import styled from 'styled-components';
import { colors } from 'style/constants';
import Container from 'components/common/Container';
import { usePageDispatchContext } from 'store/page/pageContext';

export default function EntrancePage() {
  const dispatchPage = usePageDispatchContext();

  const changePageToMain = () => {
    dispatchPage('MAIN');
  };

  return (
    <Container
      width="100%"
      height="100%"
      flexInfo={{ justify: 'center', align: 'center' }}
    >
      <StartButton onClick={changePageToMain}>주문하기</StartButton>
    </Container>
  );
}

const StartButton = styled.button`
  width: 20rem;
  height: 5rem;
  background-color: ${colors.primary};
  color: ${colors.offWhite};
`;
