import styled from 'styled-components';
import CustomModal from 'components/Modal';
import Container from 'components/common/Container';
import { colors } from 'style/constants';
import mixin from 'style/mixin';
import { ChoiceIdType, GetChoicesApiResponseDto, IChoice, IMenu } from 'types';
import MenuThumbnail from 'components/common/MenuThumbnail';
import useAxios from 'hooks/useAxios';
import { useEffect, useRef, useState } from 'react';
import QuantityController from 'components/QuantityController';
import {
  useCartDispatchContext,
  useCartStateContext,
} from 'store/cart/cartContext';
import policy from 'policy';
import CommonModalHeader from 'components/Modal/CommonModalHeader';
import CommonModalButtons from 'components/Modal/CommonModalButtons';
import { formatMoneyString } from 'utils';
import portalStore from 'store/portal';
import ChoiceGroup from './ChoiceGroup';

interface IMenuChoiceModal extends IMenu {
  closeModal: () => void;
}

interface IUserChoice {
  isOptional: boolean;
  selectedChoice: IChoice;
}
interface IUserChoices {
  [key: ChoiceIdType]: IUserChoice;
}

type TFlightInfo = {
  isFlying: boolean;
  startTop: number;
  startLeft: number;
};

export default function MenuChoiceModal({
  id,
  name,
  basePrice,
  imgUrl,
  closeModal,
}: IMenuChoiceModal) {
  const { data: choiceGroups, isLoading } = useAxios<GetChoicesApiResponseDto>(
    `/choices?menu-id=${id}`
  );
  const [topGunFlightInfo, setTopGunFlightInfo] = useState<TFlightInfo>({
    isFlying: false,
    startTop: 0,
    startLeft: 0,
  });
  const [userChoices, setUserChoices] = useState<IUserChoices | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const cartState = useCartStateContext();
  const dispatchCart = useCartDispatchContext();
  const menuNameRef = useRef<HTMLDivElement | null>(null);

  const isSameChoices = (aChoices: IChoice[], bChoices: IChoice[]) => {
    if (aChoices.length !== bChoices.length) return false;
    const aChoiceIds = aChoices.map((aChoice) => aChoice.id);
    const bChoiceIds = bChoices.map((bChoice) => bChoice.id);
    return aChoiceIds.every((aChoiceId) => bChoiceIds.includes(aChoiceId));
  };

  const findSameMenuInCart = () => {
    if (!userChoices) return null;
    const sameMenus = cartState.filter((cartItem) => cartItem.id === id);
    const useChoiceValues = Object.keys(userChoices).map(
      (key) => userChoices[+key].selectedChoice
    );
    return (
      sameMenus.find((sameMenu) =>
        isSameChoices(sameMenu.choices, useChoiceValues)
      ) || null
    );
  };

  const addToCart = () => {
    let choices;
    if (!userChoices) {
      choices = [];
    } else {
      const selectedChoices = Object.values(userChoices);
      choices = selectedChoices.map(
        (selectedChoice) => selectedChoice.selectedChoice
      );
    }
    const price = caculateMenuPrice();
    const itemData = { id, name, price, imgUrl, quantity, choices };
    const sameMenu = findSameMenuInCart();
    if (sameMenu) {
      itemData.quantity += sameMenu.quantity;
    }

    dispatchCart({ type: sameMenu ? 'UPDATE' : 'ADD', itemData });
  };

  const handleAddButtonClick = () => {
    setTopGunFlightInfo((prev) => ({ ...prev, isFlying: true }));
    setTimeout(() => {
      addToCart();
      closeModal();
    }, 1000);
  };

  const selectChoice = (groupId: number, choice: IChoice) => {
    setUserChoices((prev) => {
      const newUserChoices = { ...prev };
      newUserChoices[groupId].selectedChoice = choice;
      return newUserChoices;
    });
  };

  const caculateMenuPrice = () => {
    if (!userChoices) return basePrice;
    const userChoiceResults = Object.values(userChoices);
    const totalExtraCharge = userChoiceResults.reduce(
      (extraCharge, userChoice) => {
        const currentChoiceCharge = userChoice.selectedChoice?.extraCharge || 0;
        return (extraCharge + currentChoiceCharge) * quantity;
      },
      0
    );
    return basePrice + totalExtraCharge;
  };

  const isAllEssentialOptionSelected = () => {
    if (!userChoices) return false;
    const choiceValues = Object.values(userChoices);
    return choiceValues.every(
      (choice) => choice.isOptional || choice.selectedChoice
    );
  };

  useEffect(() => {
    if (!menuNameRef.current) return;
    const { top, left } = menuNameRef.current.getBoundingClientRect();
    const newInfo = { ...topGunFlightInfo, startTop: top, startLeft: left };
    setTopGunFlightInfo(newInfo);
  }, [menuNameRef]);

  useEffect(() => {
    if (isLoading || !choiceGroups) return;
    const initialUserChoices = choiceGroups.reduce(
      (obj, choiceGroup) => ({
        ...obj,
        [choiceGroup.id]: {
          isOptional: choiceGroup.isOptional,
          selectedChoice: null,
        },
      }),
      {}
    );
    setUserChoices(initialUserChoices);
  }, [isLoading]);

  const Portal = portalStore.makePortal();
  return topGunFlightInfo.isFlying ? (
    <Portal>
      <TopGunThumbnail src={imgUrl} topGunFlightInfo={topGunFlightInfo} />
    </Portal>
  ) : (
    <CustomModal closeModal={closeModal}>
      <CommonModalHeader>
        <h2>옵션 선택</h2>
      </CommonModalHeader>
      <ContentBody>
        <Container
          flexInfo={{ direction: 'column', align: 'center' }}
          width="40%"
        >
          <MenuThumbnail size="L" imgUrl={imgUrl} />
          <MenuName ref={menuNameRef}>{name}</MenuName>
          <TotalPrice>
            {formatMoneyString(caculateMenuPrice() * quantity)}
          </TotalPrice>
          <QuantityController
            quantity={quantity}
            setQuantity={setQuantity}
            min={policy.MIN_ORDER_QUANTITY}
            max={policy.MAX_ORDER_QUANTITY}
            size="L"
          />
        </Container>
        <Container flexInfo={{ direction: 'column' }} gap={2}>
          {userChoices &&
            choiceGroups?.map((choiceGroup, idx) => (
              <ChoiceGroup
                key={choiceGroup.id}
                choiceGroupData={choiceGroup}
                idx={idx}
                userChoice={userChoices[choiceGroup.id]}
                selectChoice={selectChoice}
              />
            ))}
        </Container>
      </ContentBody>
      <Container padding="0 5rem 4rem 5rem">
        <CommonModalButtons
          buttonInfos={[
            { text: '이전', buttonColor: colors.darkGrey, onClick: closeModal },
            {
              text: '담기',
              buttonColor: colors.primary,
              onClick: handleAddButtonClick,
              disabled: !isAllEssentialOptionSelected(),
            },
          ]}
        />
      </Container>
    </CustomModal>
  );
}

const ContentBody = styled.div`
  padding: 5rem 4rem;
  background-color: ${colors.offWhite};
  ${mixin.flexMixin({ justify: 'space-between' })}
`;

const MenuName = styled.span`
  display: block;
  font-size: 2rem;
  font-weight: 500;
  margin: 1rem 0;
`;

const TotalPrice = styled.span`
  display: block;
  font-size: 2.25rem;
  font-weight: 700;
  margin: 3rem 0 1.5rem 0;
`;

const TopGunThumbnail = styled.img<{ topGunFlightInfo: TFlightInfo }>`
  position: fixed;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  animation: flight 1s forwards;

  @keyframes flight {
    from {
      top: ${({ topGunFlightInfo }) => `${topGunFlightInfo.startTop}px`};
      left: ${({ topGunFlightInfo }) => `${topGunFlightInfo.startLeft}px`};
      width: 10rem;
      height: 10rem;
      opacity: 1;
    }
    to {
      top: ${({ topGunFlightInfo }) => `${topGunFlightInfo.startTop - 100}px`};
      left: ${({ topGunFlightInfo }) =>
        `${topGunFlightInfo.startLeft + 400}px`};
      width: 3rem;
      height: 3rem;
      opacity: 0.3;
    }
  }
`;
