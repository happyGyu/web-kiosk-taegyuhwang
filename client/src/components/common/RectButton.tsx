import styled from 'styled-components';

interface IReactButtonStyle {
  width: string;
  height: string;
  fontSize: string;
  color: string;
  backgroundColor: string;
}

interface IRectButtonProps extends IReactButtonStyle {
  text: string;
  onClick: () => void;
}

export default function RectButton(rectProps: IRectButtonProps) {
  const { text, onClick } = rectProps;
  return (
    <CustomButton onClick={onClick} rectProps={rectProps}>
      {text}
    </CustomButton>
  );
}

const CustomButton = styled.button<{ rectProps: IReactButtonStyle }>`
  ${({ rectProps: { width, height, fontSize, color, backgroundColor } }) =>
    `
      width: ${width};
      height: ${height};
      font-size: ${fontSize};
      color: ${color};
      background-color: ${backgroundColor};
    `};
`;
