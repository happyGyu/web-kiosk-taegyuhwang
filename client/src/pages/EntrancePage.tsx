import styled from 'styled-components';
import { colors } from 'style/constants';
import Container from 'components/common/Container';
import { usePageDispatchContext } from 'store/page/pageContext';
import useAxios from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import {
  GetMenuCategoriesApiResponseDto,
  GetMenusApiResponseDto,
  GetPaymentMethodsApiResponseDto,
} from 'types';
import kioskStore from 'store/kiosk';

export default function EntrancePage() {
  const dispatchPage = usePageDispatchContext();
  const [isInitializing, setIsInitializing] = useState(false);

  const { data: categories, isLoading: isCategoriesLoading } =
    useAxios<GetMenuCategoriesApiResponseDto>('/menus/categories');
  const { data: menus, isLoading: isMenusLoading } =
    useAxios<GetMenusApiResponseDto>('/menus');
  const { data: paymentMethods, isLoading: isPaymentMethodsLodaing } =
    useAxios<GetPaymentMethodsApiResponseDto>('/payment-methods');

  useEffect(() => {
    const isAnyLoading =
      isCategoriesLoading || isMenusLoading || isPaymentMethodsLodaing;
    setIsInitializing(isAnyLoading);
    if (!isAnyLoading && categories && menus && paymentMethods) {
      kioskStore.init({ categories, menus, paymentMethods });
    }
  }, [isCategoriesLoading, isMenusLoading, isPaymentMethodsLodaing]);

  const changePageToMain = () => {
    dispatchPage('MAIN');
  };

  return (
    <Container
      width="100%"
      height="100%"
      flexInfo={{ justify: 'center', align: 'center' }}
    >
      {isInitializing ? (
        <LoadingIndicator>로딩중</LoadingIndicator>
      ) : (
        <StartButton onClick={changePageToMain}>주문하기</StartButton>
      )}
    </Container>
  );
}

const StartButton = styled.button`
  width: 20rem;
  height: 5rem;
  background-color: ${colors.primary};
  color: ${colors.offWhite};
`;

const LoadingIndicator = styled.h1`
  font-size: 5rem;
`;
