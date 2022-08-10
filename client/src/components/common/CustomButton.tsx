import styled, { CSSProp } from 'styled-components';

interface ICustomButtonProps {
  style?: CSSProp;
  buttonColor?: string;
  text: string;
  onClick: () => void;
}

export default function CustomButton({
  style,
  buttonColor,
  text,
  onClick,
}: ICustomButtonProps) {
  return (
    <MyButton onClick={onClick} buttonStyle={style} buttonColor={buttonColor}>
      {text}
    </MyButton>
  );
}

const MyButton = styled.button<{ buttonColor?: string; buttonStyle?: CSSProp }>`
  background-color: ${({ buttonColor }) => buttonColor};
  ${({ buttonStyle }) => buttonStyle}
`;
