import styled from 'styled-components';
import CustomModal from 'components/Modal';
import Container from 'components/common/Container';
import { colors } from 'style/constants';
import mixin from 'style/mixin';
import { ChoiceIdType, GetChoicesApiResponseDto, IChoice, IMenu } from 'types';
import MenuThumbnail from 'components/common/MenuThumbnail';
import useAxios from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import QuantityController from 'components/QuantityController';
import { useCartDispatchContext } from 'store/cart/cartContext';
import policy from 'policy';
import CommonModalHeader from 'components/Modal/CommonModalHeader';
import CommonModalButtons from 'components/Modal/CommonModalButtons';
import { formatMoneyString } from 'utils';
import ChoiceGroup from './ChoiceGroup';

interface IMenuChoiceModal extends IMenu {
  closeModal: () => void;
}

interface IUserChoice {
  isOptional: boolean;
  selectedChoice: IChoice | null;
}
interface IUserChoices {
  [key: ChoiceIdType]: IUserChoice;
}

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

  const [userChoices, setUserChoices] = useState<IUserChoices | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const dispatchCart = useCartDispatchContext();

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
    dispatchCart({
      type: 'ADD',
      itemData: { id, name, price, imgUrl, quantity, choices },
    });
  };

  const handleAddButtonClick = () => {
    addToCart();
    closeModal();
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

  return (
    <CustomModal closeModal={closeModal}>
      <Container width="100%">
        <CommonModalHeader>
          <h2>옵션 선택</h2>
        </CommonModalHeader>
        <ContentBody>
          <Container flexInfo={{ direction: 'column', align: 'center' }}>
            <MenuThumbnail size="L" imgUrl={imgUrl} />
            <MenuName>{name}</MenuName>
            <TotalPrice>{formatMoneyString(caculateMenuPrice())}</TotalPrice>
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
