import React from 'react';
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
    <FooterWrapper>
      {buttonInfos.map((buttonInfo) => {
        const { text, buttonColor, onClick } = buttonInfo;
        return (
          <CustomButton
            style={CommonButtonStyle}
            buttonColor={buttonColor}
            text={text}
            onClick={onClick}
          />
        );
      })}
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
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
