import Container from 'components/common/Container';
import { colors } from 'style/constants';
import styled, { css, CSSProp } from 'styled-components';

interface IModalProps {
  children: React.ReactNode;
  closeModal: () => void;
  contentStyle?: CSSProp;
  backdropStyle?: CSSProp;
}

export default function CustomModal({
  children,
  closeModal,
  contentStyle,
  backdropStyle,
}: IModalProps) {
  return (
    <Container
      position="absolute"
      top="0"
      left="0"
      width="100%"
      height="100%"
      flexInfo={{ justify: 'center', align: 'center' }}
    >
      <ModalBackdrop onClick={closeModal} backdropStyle={backdropStyle} />
      <ModalContent contentStyle={contentStyle}>{children}</ModalContent>
    </Container>
  );
}

const ModalBackdrop = styled.div<{ backdropStyle?: CSSProp }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  ${({ backdropStyle }) => backdropStyle}
`;

const ModalContent = styled.div<{ contentStyle?: CSSProp }>`
  z-index: 11;
  ${({ contentStyle }) => contentStyle}
`;

const defaultBackdropStyle = css`
  background-color: rgba(0, 0, 0, 0.4);
`;

const defaultContentStyle = css`
  background-color: ${colors.offWhite};
`;

CustomModal.defaultProps = {
  contentStyle: defaultContentStyle,
  backdropStyle: defaultBackdropStyle,
};
