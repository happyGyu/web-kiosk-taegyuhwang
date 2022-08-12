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
  const { data: menusGroupByCategory, isLoading: isMenusLoading } =
    useAxios<GetMenusApiResponseDto>('/menus');
  const { data: paymentMethods, isLoading: isPaymentMethodsLodaing } =
    useAxios<GetPaymentMethodsApiResponseDto>('/payment-methods');

  useEffect(() => {
    const isAnyLoading =
      isCategoriesLoading || isMenusLoading || isPaymentMethodsLodaing;
    setIsInitializing(isAnyLoading);
    if (!isAnyLoading && categories && menusGroupByCategory && paymentMethods) {
      kioskStore.init({ categories, menusGroupByCategory, paymentMethods });
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
      <StartButton isInitializing={isInitializing} onClick={changePageToMain}>
        {isInitializing ? '키오스크 시작 중' : '주문하기'}
      </StartButton>
    </Container>
  );
}

const StartButton = styled.button<{ isInitializing: boolean }>`
  width: 20rem;
  padding: 2rem;
  font-size: 2rem;
  background-color: ${({ isInitializing }) =>
    isInitializing ? colors.placeholder : colors.primary};
  color: ${colors.offWhite};
`;
