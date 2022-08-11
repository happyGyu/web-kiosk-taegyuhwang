import styled from 'styled-components';
import GlobalStyle from 'style/GlobalStyle';
import { colors, shadows } from 'style/constants';
import MainPage from 'pages/MainPage';
import EntrancePage from 'pages/EntrancePage';
import { usePageContext } from 'store/page/pageContext';
import { useEffect, useRef } from 'react';
import portalStore from 'store/portal';
import axios from 'axios';

export default function App() {
  const currentPageType = usePageContext();
  const displayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!displayRef.current) return;
    portalStore.setPortalRoot(displayRef.current);
  }, []);

  return (
    <>
      <GlobalStyle />
      <KioskMachine>
        <Display ref={displayRef}>
          {currentPageType === 'ENTRANCE' && <EntrancePage />}
          {currentPageType === 'MAIN' && <MainPage />}
        </Display>
      </KioskMachine>
    </>
  );
}

const KioskMachine = styled.div`
  background: ${colors.titleActive};
  padding: 4rem;
  width: 960px;
  height: 1440px;
  margin: 5rem auto;
  border-radius: 2rem;
  box-shadow: ${shadows.default};
`;

const Display = styled.div`
  position: relative;
  height: 100%;
  background: ${colors.background};
`;

function test() {
  const menus = [
    {
      name: '민트 블렌드 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000056]_20210415135215632.jpg',
    },
    {
      name: '아이스 민트 블렌드 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000059]_20210415141656038.jpg',
    },
    {
      name: '아이스 얼 그레이 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000039]_20210415142055860.jpg',
    },
    {
      name: '아이스 유스베리 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000229]_20210415142219481.jpg',
    },
    {
      name: '아이스 유자 민트 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2022/04/[9200000002959]_20220411155904911.jpg',
    },
    {
      name: '아이스 잉글리쉬 브렉퍼스트 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000019]_20210415142323353.jpg',
    },
    {
      name: '아이스 제주 유기 녹차',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[400400000094]_20210415230316469.jpg',
    },
    {
      name: '아이스 캐모마일 블렌드 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000079]_20210415143641139.jpg',
    },
    {
      name: '아이스 히비스커스 블렌드 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000069]_20210415143811231.jpg',
    },
    {
      name: '얼 그레이 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000036]_20210415143933425.jpg',
    },
    {
      name: '유스베리 로즈 티 브리즈',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2022/04/[9200000004116]_20220418153251099.jpg',
    },
    {
      name: '유스베리 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000226]_20210415144434521.jpg',
    },
    {
      name: '유자 민트 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2022/04/[9200000002956]_20220411155551915.jpg',
    },
    {
      name: '잉글리쉬 브렉퍼스트 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000016]_20210415153648533.jpg',
    },
    {
      name: '자몽 허니 블랙 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000187]_20210419131229539.jpg',
    },
    {
      name: '제주 유기 녹차',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[400400000091]_20210415132229904.jpg',
    },
    {
      name: '캐모마일 블렌드 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000076]_20210415154920731.jpg',
    },
    {
      name: '히비스커스 블렌드 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000066]_20210415155836395.jpg',
    },
    {
      name: '아이스 유스베리 로즈 티 브리즈',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2022/04/[9200000004117]_20220418153226007.jpg',
    },
    {
      name: '아이스 자몽 허니 블랙 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000190]_20210419131723532.jpg',
    },
    {
      name: '제주 그린 티 브리즈',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2022/04/[9200000004115]_20220418153154247.jpg',
    },
    {
      name: '제주 키위 오션 그린티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2022/03/[9200000003998]_20220311105658286.jpg',
    },
    {
      name: '폼폼 민트 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2022/04/[9200000004113]_20220418153033969.jpg',
    },
    {
      name: '폼폼 유스베리 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2022/04/[9200000004114]_20220418153123863.jpg',
    },
    {
      name: '돌체 블랙 밀크 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2022/02/[9200000002963]_20220203082330522.jpg',
    },
    {
      name: '아이스 돌체 블랙 밀크 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2022/02/[9200000002966]_20220203082502987.jpg',
    },
    {
      name: '아이스 제주 유기농 말차로 만든 라떼',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002499]_20210419130902541.jpg',
    },
    {
      name: '아이스 차이 티 라떼',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[135612]_20210415142512793.jpg',
    },
    {
      name: '아이스 허니 얼 그레이 밀크 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2020/09/[9200000003234]_20200911143458239.jpg',
    },
    {
      name: '제주 유기농 말차로 만든 라떼',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002496]_20210419131039350.jpg',
    },
    {
      name: '차이 티 라떼',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[135608]_20210415154244810.jpg',
    },
    {
      name: '허니 얼 그레이 밀크 티',
      imgUrl:
        'https://image.istarbucks.co.kr/upload/store/skuimg/2020/09/[9200000003233]_20200911143800286.jpg',
    },
  ];

  const dto = menus.map((menu) => ({
    name: menu.name,
    basePrice: 4500,
    imgUrl: menu.imgUrl,
    isSoldOut: false,
    categoryId: 6,
  }));

  dto.forEach((e) => axios.post('/menus', e));
}

// test();
