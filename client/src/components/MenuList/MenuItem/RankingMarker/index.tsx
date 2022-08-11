import styled from 'styled-components';
import { colors } from 'style/constants';
import mixin from 'style/mixin';
import policy from 'policy';

interface IRankingMarkerProps {
  ranking: number;
}

const markColors = {
  PRIMARY: { color: colors.primary, bgColor: colors.gold },
  SECONDARY: { color: colors.secondary, bgColor: colors.silver },
  TERTIARY: { color: colors.darkGrey, bgColor: colors.bronze },
  OTHER: { color: colors.offWhite, bgColor: colors.darkGrey },
};

export default function RankingMarker({ ranking }: IRankingMarkerProps) {
  const decideMarkColors = (target: number) => {
    if (target <= policy.PRIMARY_RANK_RANGE) {
      return markColors.PRIMARY;
    }
    if (target <= policy.SECONDARY_RANK_RANGE) {
      return markColors.SECONDARY;
    }
    if (target <= policy.TERTIARY_RANK_RANKGE) {
      return markColors.TERTIARY;
    }
    return markColors.OTHER;
  };
  const { color, bgColor } = decideMarkColors(ranking);
  return (
    <RankingMark ranking={ranking} color={color} bgColor={bgColor}>
      {ranking}위
    </RankingMark>
  );
}

const RankingMark = styled.div<{
  ranking: number;
  bgColor: string;
  color: string;
}>`
  opacity: ${({ ranking }) => (ranking ? 0.8 : 0)};
  transition: opacity 1s;
  position: absolute;
  top: 0;
  left: 0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 25%;
  font-weight: 600;
  ${mixin.flexMixin({ justify: 'center', align: 'center' })}
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
`;
