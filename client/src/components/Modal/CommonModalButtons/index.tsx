import { colors } from 'style/constants';
import mixin from 'style/mixin';
import styled, { css } from 'styled-components';
import CustomButton from 'components/common/CustomButton';

interface ICommonModalButton {
  text: string;
  buttonColor: string;
  onClick: () => void;
}

interface ICommonModalButtonsProps {
  buttonInfos: ICommonModalButton[];
}

export default function CommonModalButtons({
  buttonInfos,
}: ICommonModalButtonsProps) {
  return (
    <ModalButtonsWrapper>
      {buttonInfos.map((buttonInfo) => {
        const { text, buttonColor, onClick } = buttonInfo;
        return (
          <CustomButton
            key={`${text}_button`}
            style={CommonModalButtonStyle}
            buttonColor={buttonColor}
            text={text}
            onClick={onClick}
          />
        );
      })}
    </ModalButtonsWrapper>
  );
}

const ModalButtonsWrapper = styled.div`
  padding: 0rem 5rem 2rem 5rem;
  background-color: ${colors.offWhite};
  ${mixin.flexMixin({ align: 'center', justify: 'space-between' })}
`;

const CommonModalButtonStyle = css`
  width: 13rem;
  padding: 1.5rem 0;
  color: ${colors.offWhite};
  font-size: 1.5rem;
  font-weight: 700;
`;
