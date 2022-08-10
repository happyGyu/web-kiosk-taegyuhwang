import React from 'react';
import { colors } from 'style/constants';
import mixin from 'style/mixin';
import styled from 'styled-components';

export default function CommonModalHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HeaderWrapper>{children}</HeaderWrapper>;
}

const HeaderWrapper = styled.div`
  width: 100%;
  padding: 2rem;
  background-color: ${colors.primary};
  color: ${colors.offWhite};
  font-size: 2rem;
  font-weight: 700;
  ${mixin.flexMixin({ justify: 'center', align: 'center' })}
`;
