import React from 'react';
import Container from 'components/common/Container';
import CartMenuItem from './CartMenuItem';

export default function CartMenuList() {
  return (
    <Container flexGrow={1} padding="0 1.25rem" width="100%">
      <CartMenuItem />
      <CartMenuItem />
      <CartMenuItem />
    </Container>
  );
}
