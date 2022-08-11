import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

type CMouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

interface IDragSliderProps {
  width?: string;
  height?: string;
  onClick: (e: CMouseEvent) => void;
  children: React.ReactNode;
}

export default function DragSlider({
  width,
  height,
  onClick,
  children,
}: IDragSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [originalPos, setOriginalPos] = useState<number | null>(null);
  const [sliderPos, setSliderPos] = useState<number>(0);

  useEffect(() => {
    if (isDragging) return;
    if (isOverLimit()) {
      setSliderPos(0);
    }
  }, [isDragging]);

  const startDragging = (event: CMouseEvent) => {
    setOriginalPos(event.clientX - sliderPos);
  };

  const finishDragging = (event: CMouseEvent) => {
    if (originalPos && !isDragging) onClick(event);
    setIsDragging(false);
    setOriginalPos(null);
  };

  const handleMouseMove = (event: CMouseEvent) => {
    if (!originalPos) return;
    setIsDragging(true);
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
