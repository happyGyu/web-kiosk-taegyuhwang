import styled from 'styled-components';
import spinner from '../../assests/spinner.gif';

export default function LoadingIndicator() {
  return <Spinner src={spinner} />;
}

const Spinner = styled.img`
  width: 100%;
  height: 100%;
`;
