import policy from 'policy';
import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';

type CMouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

interface IDragSliderProps {
  width?: string;
  height?: string;
  children: React.ReactNode;
  onClick: (e: CMouseEvent) => void;
}

type TLimitState = {
  LEFT: number;
  RIGHT: number;
};

export default function DragSlider({
  width,
  height,
  children,
  onClick,
}: IDragSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [originalPos, setOriginalPos] = useState<number | null>(null);
  const [sliderPos, setSliderPos] = useState<number>(0);
  const [limitState, setLimitState] = useState<TLimitState>({
    LEFT: 0,
    RIGHT: 0,
  });
  const sliderRef = useRef<HTMLDivElement>(null);

  const getSliderComponentsWidth = () => {
    const sliderWidth = sliderRef.current?.getBoundingClientRect().width;
    const childrenWidth =
      sliderRef.current?.firstElementChild?.getBoundingClientRect().width;
    return { sliderWidth, childrenWidth };
  };

  const calPosLimit = (sliderWidth: number, childrenWidth: number) => {
    const leftLimit = policy.DRAG_LIMIT_PX;
    const rightLimit = sliderWidth - policy.DRAG_LIMIT_PX - childrenWidth;
    return { leftLimit, rightLimit };
  };

  const handleMouseDown = (event: CMouseEvent) => {
    setOriginalPos(event.clientX - sliderPos);
  };

  const handleMouseUp = (event: CMouseEvent) => {
    if (originalPos && !isDragging) onClick(event);
    setIsDragging(false);
    setOriginalPos(null);
  };

  const isIntendedDrag = (event: CMouseEvent) => {
    if (!originalPos) return false;
    return Math.abs(event.clientX - originalPos) > policy.DRAG_THRESHIOLD;
  };

  const handleMouseMove = (event: CMouseEvent) => {
    if (!originalPos) return;
    if (!isIntendedDrag(event)) return;
    setIsDragging(true);
    setSliderPos(handlePos(event.clientX - originalPos));
  };

  const handlePos = (pos: number, goBack = false) => {
    const posState = checkPosState(pos);
    if (posState === 'RIGHT_OVER')
      return goBack
        ? limitState.RIGHT + policy.DRAG_LIMIT_PX
        : limitState.RIGHT;
    if (posState === 'LEFT_OVER')
      return goBack ? limitState.LEFT - policy.DRAG_LIMIT_PX : limitState.LEFT;
    return pos;
  };

  const checkPosState = (pos: number): 'OK' | 'LEFT_OVER' | 'RIGHT_OVER' => {
    const { LEFT, RIGHT } = limitState;
    if (!LEFT || !RIGHT) return 'OK';
    if (pos >= LEFT) return 'LEFT_OVER';
    if (pos <= RIGHT) return 'RIGHT_OVER';
    return 'OK';
  };

  useEffect(() => {
    const { sliderWidth, childrenWidth } = getSliderComponentsWidth();
    if (!sliderWidth || !childrenWidth) return;
    const { leftLimit, rightLimit } = calPosLimit(sliderWidth, childrenWidth);
    setLimitState({ LEFT: leftLimit, RIGHT: rightLimit });
  }, [sliderRef]);

  useEffect(() => {
    if (isDragging) return;
    setSliderPos(handlePos(sliderPos, true));
  }, [isDragging]);

  return (
    <SliderContainer
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      width={width}
      height={height}
    >
      <ChildrenWrapper left={sliderPos} isDragging={isDragging}>
        {children}
      </ChildrenWrapper>
    </SliderContainer>
  );
}

const SliderContainer = styled.div<{ width?: string; height?: string }>`
  position: relative;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  overflow: hidden;
  background-color: white;
`;

const ChildrenWrapper = styled.div<{ left: number; isDragging: boolean }>`
  ${({ isDragging }) =>
    !isDragging &&
    css`
      transition: 1s;
    `}
  position: absolute;
  height: fit-content;
  top: 0;
  left: ${({ left }) => left}px;
`;
