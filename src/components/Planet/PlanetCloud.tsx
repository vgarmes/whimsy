import styled from '@emotion/styled';
import { getCloudPathFromPoints } from './helpers';
import Orbit from './Orbit';

interface Shape {
  rows: number;
  columns: number;
  points: Array<number>;
}

interface Props {
  shape: Shape;
  planetSize: number;
  offset?: number;
  color?: string;
  opacity?: number;
  rotation?: number;
  orbitDuration?: number;
  orbitDelay?: number;
}

const PlanetCloud: React.FC<Props> = ({
  shape: { rows, columns, points },
  planetSize,
  offset = 0,
  color = '#FFF',
  opacity = 0.9,
  rotation = -10,
  orbitDelay = 0,
  orbitDuration = 50e3,
}) => {
  const path = getCloudPathFromPoints(points);

  // The path generated will be based on a square grid, with a number of
  // rows and columns specified by the shape.
  // If a planet has multiple clouds, we want to ensure that each cell in that
  // grid is the same size; A cloud with 10 rows should be twice the height
  // of one with 5 rows, given the same planet size.
  const RATIO_BETWEEN_PLANET_SIZE_AND_ROW_HEIGHT = 0.1;
  const height = planetSize * RATIO_BETWEEN_PLANET_SIZE_AND_ROW_HEIGHT * rows;

  const width = height * (columns / rows);

  return (
    <Wrapper opacity={opacity} offset={offset} rotation={rotation}>
      <Orbit
        planetSize={planetSize}
        duration={orbitDuration}
        delay={orbitDelay}
      >
        <svg width={width} height={height} viewBox={`0 0 ${columns} ${rows}`}>
          <path d={path} fill={color} />
        </svg>
      </Orbit>
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  opacity: number;
  offset: number;
  rotation: number;
}>`
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => props.opacity};
  transform: translateY(${(props) => props.offset}px)
    rotate(${(props) => props.rotation}deg);
`;

export default PlanetCloud;
