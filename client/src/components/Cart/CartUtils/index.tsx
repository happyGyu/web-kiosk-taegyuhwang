import React from 'react';
import mixin from 'style/mixin';
import styled, { css } from 'styled-components';
import { colors } from 'style/constants';
import Container from 'components/common/Container';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function CartUtils() {
  return (
    <Container flexInfo={{ direction: 'column' }} gap={0.125}>
      <Container flexInfo={{ align: 'center' }} gap={0.125} width="100%">
        <CustomButton width="25%" backgroundColor={colors.tertiary}>
          <DeleteOutlinedIcon />
        </CustomButton>
        <CustomButton backgroundColor={colors.primary}>주문하기</CustomButton>
      </Container>
      <CustomButton backgroundColor={colors.darkGrey}>처음으로</CustomButton>
    </Container>
  );
}

const CustomButton = styled.button<{
  width?: string;
  backgroundColor: string;
}>`
  ${mixin.flexMixin({ justify: 'center', align: 'center' })}
  ${({ width, backgroundColor }) => css`
    width: ${width || '100%'};
    background-color: ${backgroundColor};
  `}
  padding: 1.125rem 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${colors.offWhite};
`;
