import styled, { CSSProp } from 'styled-components';

interface ICustomButtonProps {
  style: CSSProp;
  text: string;
  onClick: () => void;
}

export default function CustomButton({
  style,
  text,
  onClick,
}: ICustomButtonProps) {
  return (
    <MyButton onClick={onClick} buttonStyle={style}>
      {text}
    </MyButton>
  );
}

const MyButton = styled.button<{ buttonStyle: CSSProp }>`
  ${({ buttonStyle }) => buttonStyle}
`;
