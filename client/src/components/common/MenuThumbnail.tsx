import styled, { css } from 'styled-components';
import Container from './Container';

type TImageSize = 'S' | 'M' | 'L';

interface IMenuThumbnailProps {
  size: TImageSize;
  imgUrl: string;
}

export default function MenuThumbnail({ size, imgUrl }: IMenuThumbnailProps) {
  return (
    <Container>
      <MenuImage size={size} src={imgUrl} />
    </Container>
  );
}

const SmallImageStyle = css`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
`;

const MediumImageStyle = css`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
`;
const LargeImageStyle = css`
  width: 10rem;
  height: 10rem;
  border-radius: 3rem;
`;

const imageStyles = {
  S: SmallImageStyle,
  M: MediumImageStyle,
  L: LargeImageStyle,
};

const MenuImage = styled.img<{ size: TImageSize }>`
  ${({ size }) => imageStyles[size]}
`;
