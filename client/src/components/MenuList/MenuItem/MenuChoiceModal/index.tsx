import styled, { css } from 'styled-components';
import CustomModal from 'components/Modal';
import Container from 'components/common/Container';
import { colors } from 'style/constants';
import mixin from 'style/mixin';
import { IMenu } from 'types';
import MenuThumbnail from 'components/common/MenuThumbnail';

interface IMenuChoiceModal extends IMenu {
  closeModal: () => void;
}

export default function MenuChoiceModal({
  id,
  name,
  basePrice,
  imgUrl,
  closeModal,
}: IMenuChoiceModal) {
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
          <Container
            width="50%"
            flexInfo={{ direction: 'column', align: 'center' }}
          >
            <MenuThumbnail size="L" imgUrl={imgUrl} />
            <MenuName>{name}</MenuName>
            <TotalPrice>{basePrice.toLocaleString()}원</TotalPrice>
            {/* <QuantityCounter /> */}
          </Container>
          <Container
            width="50%"
            flexInfo={{ direction: 'column', align: 'center' }}
          >
            {/* <ChoiceGroupName />
            <ChoiceList>
              <ChoiceItem />
              <ChoiceItem />
            </ChoiceList> */}
          </Container>
        </ContentBody>
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
  padding: 2rem 3rem;
  background-color: ${colors.offWhite};
  ${mixin.flexMixin({ wrap: 'wrap' })}
`;

const Area = styled.div`
  width: 50%;
  ${mixin.flexMixin({
    direction: 'column',
    align: 'center',
  })}
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
  margin-top: 3rem;
`;
