import styled, { css } from 'styled-components';
import CustomModal from 'components/Modal';
import Container from 'components/common/Container';
import { colors } from 'style/constants';
import mixin from 'style/mixin';
import { ChoiceIdType, GetChoicesApiResponseDto, IChoice, IMenu } from 'types';
import MenuThumbnail from 'components/common/MenuThumbnail';
import useAxios from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import QuantityController from 'components/QuantityController';
import CustomButton from 'components/common/CustomButton';
import { useCartDispatchContext } from 'store/cart/cartContext';
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
    const totalPricePerEach = caculateTotalPricePerEach();
    dispatchCart({
      type: 'ADD',
      itemData: { id, name, totalPricePerEach, imgUrl, quantity, choices },
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

  const caculateTotalPricePerEach = () => {
    if (!userChoices) return basePrice;
    const userChoiceResults = Object.values(userChoices);
    const totalExtraCharge = userChoiceResults.reduce(
      (extraCharge, userChoice) => {
        const currentChoiceCharge = userChoice.selectedChoice?.extraCharge || 0;
        return extraCharge + currentChoiceCharge;
      },
      0
    );
    return basePrice + totalExtraCharge;
  };

  const caculateTotalPrice = () => caculateTotalPricePerEach() * quantity;

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
    <CustomModal
      contentStyle={css`
        width: 75%;
      `}
      closeModal={closeModal}
    >
      <Container width="100%">
        <ContentTitle>
          <h2>옵션 선택</h2>
        </ContentTitle>
        <ContentBody>
          <Container flexInfo={{ direction: 'column', align: 'center' }}>
            <MenuThumbnail size="L" imgUrl={imgUrl} />
            <MenuName>{name}</MenuName>
            <TotalPrice>{caculateTotalPrice().toLocaleString()}원</TotalPrice>
            <QuantityController
              quantity={quantity}
              setQuantity={setQuantity}
              min={1}
              max={9}
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
        <ChoiceModalButtons>
          <CustomButton
            style={CancleButtonStyle}
            text="이전"
            onClick={closeModal}
          />
          <CustomButton
            style={ConfirmButtonStyle}
            text="담기"
            onClick={handleAddButtonClick}
          />
        </ChoiceModalButtons>
      </Container>
    </CustomModal>
  );
}

const ContentTitle = styled.div`
  width: 100%;
  padding: 2rem;
  background-color: ${colors.primary};
  color: ${colors.offWhite};
  font-size: 2rem;
  font-weight: 700;
  ${mixin.flexMixin({ justify: 'center', align: 'center' })}
`;

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

const ChoiceModalButtons = styled.div`
  padding: 0rem 5rem 2rem 5rem;
  background-color: ${colors.offWhite};
  ${mixin.flexMixin({ align: 'center', justify: 'space-between' })}
`;

const CommonButtonStyle = css`
  width: 13rem;
  padding: 1.5rem 0;
  color: ${colors.offWhite};
  font-size: 1.5rem;
  font-weight: 700;
`;

const CancleButtonStyle = css`
  ${CommonButtonStyle};
  background-color: ${colors.darkGrey};
`;

const ConfirmButtonStyle = css`
  ${CommonButtonStyle}
  background-color: ${colors.primary};
`;
