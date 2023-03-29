// import colors
import { useRef } from 'react';
import type { FileStatus } from './types';
import { COLORS } from './constants';
import styled from '@emotion/styled';

interface Props extends Omit<StyleProps, 'rotation'> {
  id: string;
  handleMouseDown?: (
    event: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => void;
}

interface StyleProps {
  x: number;
  y: number;
  size: number;
  status: FileStatus;
  rotation: number;
}

const WIDTH_RATIO = 20 / 28;

const isGrabbable = (status: FileStatus) =>
  status !== 'being-captured' && status !== 'captured';

const Wrapper = styled.div<StyleProps>`
  transform: ${(props) =>
    `translate(${props.x - (props.size * WIDTH_RATIO) / 2}px, ${
      props.y - props.size / 2
    }px) rotate(${props.rotation}deg)`};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  height: ${(props) => props.size}px;
  overflow: visible;
  will-change: transform;
  transform-origin: center center;
  cursor: ${(props) => (isGrabbable(props.status) ? 'grab' : 'default')};

  &:active {
    cursor: ${(props) => (isGrabbable(props.status) ? 'grabbing' : 'default')};
  }
`;

const File: React.FC<Props> = ({ x, y, size, status, id, handleMouseDown }) => {
  const lastCoordinates = useRef<Array<{ x: number; y: number }>>([]);

  let fileRotation = 0;
  if (lastCoordinates.current.length > 0) {
    const previousCoordinate = lastCoordinates.current[0];

    const deltaX = x - previousCoordinate.x;
    const deltaY = y - previousCoordinate.y;

    const angleInRads = Math.atan2(deltaY, deltaX);
    const angleInDegrees = (angleInRads * 180) / Math.PI;

    // We want our file to be sticking up, not sideways, so we add 90 degrees.
    fileRotation = angleInDegrees + 90;
  }

  lastCoordinates.current.push({ x, y });
  if (lastCoordinates.current.length > 8) {
    lastCoordinates.current.shift();
  }

  return (
    <Wrapper
      x={x}
      y={y}
      size={size}
      status={status}
      rotation={fileRotation}
      onMouseDown={(event) =>
        typeof handleMouseDown === 'function' && handleMouseDown(event, id)
      }
    >
      <svg viewBox="0 0 20 28" height="100%">
        <defs>
          <filter id="file-corner" x="-100%" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceGraphic" dx="-1" dy="1" />
            <feColorMatrix
              result="matrixOut"
              in="offOut"
              type="matrix"
              values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0"
            />
            <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="1" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>
        <path
          d={`
                M0,0
                L15,0
                L20,5
                L20,28
                L0,28
              `}
          stroke="none"
          fill={COLORS.lightBackground}
        />
        <polygon
          points="15,0 15,5 20,5"
          stroke="none"
          fill={COLORS.lightBackground}
          filter="url(#file-corner)"
        />
      </svg>
    </Wrapper>
  );
};

export default File;
