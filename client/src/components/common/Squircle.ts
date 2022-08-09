import styled from 'styled-components';
import cssUtils from 'utils/css.util';

interface ISquircleProps {
  width?: number | string;
  height?: number | string;
  unit?: string;
  opacity?: number;
  backgroundColor?: string;
  borderLineColor?: string;
  color?: string;
  borderWidth?: string;
  borderRadius?: string;
}

const Squircle = styled.div<ISquircleProps>`
  border-width: ${({ borderWidth }) => borderWidth || '1px'};
  border-radius: ${({ borderRadius, height, unit }) =>
    borderRadius || cssUtils.getCssValueByUnit(height, unit)};
  width: ${({ width, unit }) => cssUtils.getCssValueByUnit(width, unit)};
  height: ${({ height, unit }) => cssUtils.getCssValueByUnit(height, unit)};
  opacity: ${({ opacity }) => opacity || 1};
  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${backgroundColor};`}
  ${({ borderLineColor }) =>
    borderLineColor && `border-color:${borderLineColor};`}
  ${({ color }) => color && `color:  ${color};`}
`;

export default Squircle;
