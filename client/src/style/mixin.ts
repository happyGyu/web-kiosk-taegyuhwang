import { css, FlattenSimpleInterpolation } from 'styled-components';

export interface IMixin {
  flexMixin: (object: any) => FlattenSimpleInterpolation;
}

const mixin: IMixin = {
  flexMixin: ({
    direction = 'row',
    align = 'flex-start',
    justify = 'flex-start',
    wrap = 'no-wrap',
  }) => css`
    display: flex;
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify};
    flex-wrap: ${wrap};
  `,
};

export default mixin;
