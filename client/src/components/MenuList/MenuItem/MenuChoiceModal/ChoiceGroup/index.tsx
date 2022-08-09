import styled, { css } from 'styled-components';
import Container from 'components/common/Container';
import { IChoice, IChoiceGroup } from 'types';
import { useState } from 'react';
import mixin from 'style/mixin';
import { colors } from 'style/constants';

interface IChoiceGroupProps {
  choiceGroupData: IChoiceGroup;
  idx: number;
  userChoice: {
    isOptional: boolean;
    selectedChoice: IChoice | null;
  };
  selectChoice: (groupId: number, choice: IChoice) => void;
}

export default function ChoiceGroup({
  choiceGroupData,
  idx,
  userChoice,
  selectChoice,
}: IChoiceGroupProps) {
  const { name, choices } = choiceGroupData;

  return (
    <Container>
      <ChoiceGroupName>{`${idx + 1}.${name}`}</ChoiceGroupName>
      <Container width="100%" flexInfo={{ align: 'center' }} mt="1rem">
        {choices.map((choice) => (
          <ChoiceItem
            key={choice.id}
            isSelected={userChoice.selectedChoice === choice}
            onClick={() => selectChoice(choiceGroupData.id, choice)}
          >
            <span>{choice.name}</span>
            <span>{`+${choice.extraCharge}`}</span>
          </ChoiceItem>
        ))}
      </Container>
    </Container>
  );
}

const ChoiceGroupName = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
`;

const ChoiceItem = styled.div<{ isSelected: boolean }>`
  border: 3px solid;
  font-size: 1.25rem;
  font-weight: 600;
  width: 5rem;
  height: 5rem;
  ${({ isSelected }) =>
    isSelected
      ? css`
          border-color: ${colors.primary};
          color: ${colors.primary};
        `
      : css`
          border-color: ${colors.placeholder};
          color: ${colors.placeholder};
          background-color: ${colors.background};
        `};
  ${mixin.flexMixin({
    direction: 'column',
    align: 'center',
    justify: 'center',
  })};
  gap: 0.5rem;
`;
