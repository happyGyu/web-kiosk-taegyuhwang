import mixin from 'style/mixin';
import styled, { css } from 'styled-components';

type FlexTypes = {
  direction?: 'row' | 'column';
  align?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  wrap?: 'wrap' | 'no-wrap';
};

const Container = styled.div<{
  width?: string;
  height?: string;
  margin?: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  padding?: string;
  flexInfo?: FlexTypes;
  gap?: number;
  position?: string;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}>`
  ${({
    width,
    height,
    margin,
    mt,
    mb,
    ml,
    mr,
    padding,
    gap,
    position,
    left,
    right,
    top,
    bottom,
  }) => css`
    ${width && `width: ${width};`}
    ${height && `height: ${height};`}
    ${margin && `margin: ${margin};`}
    ${mt && `margin-top: ${mt};`}
    ${mb && `margin-bottom: ${mb};`}
    ${ml && `margin-left: ${ml};`}
    ${mr && `margin-right: ${mr};`}
    ${padding && `padding: ${padding};`}
    ${gap && `gap : ${gap}rem;`}
    ${position && `position : ${position};`}
    ${left && `left : ${left};`}
    ${right && `right : ${right};`}
    ${top && `top : ${top};`}
    ${bottom && `bottom : ${bottom};`}
  `}

  ${({ flexInfo }) => flexInfo && mixin.flexMixin(flexInfo)}
`;

export default Container;
