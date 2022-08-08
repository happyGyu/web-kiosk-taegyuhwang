import React, { MouseEventHandler, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

interface IDragSliderProps {
  children: React.ReactNode;
}

export default function DragSlider({ children }: IDragSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [originalPos, setOriginalPos] = useState<number | null>(null);
  const [sliderPos, setSliderPos] = useState<number>(0);

  useEffect(() => {
    if (isDragging) return;
    if (isOverLimit()) {
      setSliderPos(0);
    }
  }, [isDragging]);

  const startDragging = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsDragging(true);
    setOriginalPos(event.clientX - sliderPos);
  };

  const finishDragging = () => {
    setIsDragging(false);
    setOriginalPos(null);
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!isDragging) return;
    if (!originalPos) return;
    setSliderPos(event.clientX - originalPos);
    if (isOverLimit()) {
      setSliderPos(30);
    }
  };

  const isOverLimit = () => sliderPos >= 30;

  return (
    <SliderContainer
      onMouseDown={startDragging}
      onMouseUp={finishDragging}
      onMouseLeave={finishDragging}
      onMouseMove={handleMouseMove}
    >
      <ChildrenWrapper left={sliderPos} isDragging={isDragging}>
        {children}
      </ChildrenWrapper>
    </SliderContainer>
  );
}

const SliderContainer = styled.div<{ width?: string; height?: string }>`
  position: relative;
  width: 100%;
  height: 4rem;
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
