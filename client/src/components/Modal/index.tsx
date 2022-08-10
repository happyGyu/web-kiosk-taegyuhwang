import styled, { CSSProp } from 'styled-components';
import portalStore from 'store/portal';
import { colors } from 'style/constants';
import Container from 'components/common/Container';

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
  const Portal = portalStore.makePortal();
  return (
    <Portal>
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
    </Portal>
  );
}

const ModalBackdrop = styled.div<{ backdropStyle?: CSSProp }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.4);
  ${({ backdropStyle }) => backdropStyle}
`;

const ModalContent = styled.div<{ contentStyle?: CSSProp }>`
  z-index: 11;
  width: 75%;
  background-color: ${colors.offWhite};
  ${({ contentStyle }) => contentStyle}
`;
