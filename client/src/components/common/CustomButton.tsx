import styled, { CSSProp } from 'styled-components';

interface ICustomButtonProps {
  style?: CSSProp;
  buttonColor?: string;
  text: string;
  disabled?: boolean;
  onClick: () => void;
}

export default function CustomButton({
  style,
  buttonColor,
  text,
  disabled,
  onClick,
}: ICustomButtonProps) {
  return (
    <MyButton
      disabled={disabled}
      onClick={onClick}
      buttonStyle={style}
      buttonColor={buttonColor}
    >
      {text}
    </MyButton>
  );
}

const MyButton = styled.button<{
  diabled?: boolean;
  buttonColor?: string;
  buttonStyle?: CSSProp;
}>`
  background-color: ${({ buttonColor }) => buttonColor};
  ${({ buttonStyle }) => buttonStyle}
  opacity: ${({ disabled }) => disabled && 0.7};
`;
