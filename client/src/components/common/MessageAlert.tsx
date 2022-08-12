import CustomModal from 'components/Modal';
import { colors } from 'style/constants';
import mixin from 'style/mixin';
import styled, { css } from 'styled-components';
import CustomButton from './CustomButton';

export default function MessageAlert({
  message,
  closeAlert,
}: {
  message: string;
  closeAlert: () => void;
}) {
  return (
    <CustomModal closeModal={closeAlert}>
      <AlertWrapper>
        <AlertMessage>{message}</AlertMessage>
        <CustomButton style={OkButtonStyle} onClick={closeAlert}>
          확인
        </CustomButton>
      </AlertWrapper>
    </CustomModal>
  );
}

const AlertWrapper = styled.div`
  ${mixin.flexMixin({
    direction: 'column',
    justify: 'center',
    align: 'center',
  })}
  padding: 3rem;
  gap: 3rem;
  border: 3px solid ${colors.error};
`;

const AlertMessage = styled.span`
  font-size: 2rem;
  font-weight: 500;
`;

const OkButtonStyle = css`
  width: 8rem;
  height: 4rem;
  font-size: 1.5rem;
  font-weight: 500;
  background-color: ${colors.primary};
  color: ${colors.offWhite};
`;
