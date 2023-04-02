import styled from '@emotion/styled';

interface Props {
  size?: number;
  angle?: number;
  background?: string;
  groundColor?: string;
  atmosphere?: number;
  glow?: (size: number) => React.ReactNode;
  clouds?: (size: number) => React.ReactNode;
  rings?: (size: number) => React.ReactNode;
  land?: (size: number) => React.ReactNode;
  moons?: (size: number) => React.ReactNode;
}
const Planet: React.FC<Props> = ({
  size = 100,
  angle = 75,
  background = 'red',
  groundColor,
  atmosphere,
  glow,
  clouds,
  rings,
  land,
  moons,
}) => {
  return (
    <Wrapper size={size} angle={angle}>
      {atmosphere && (
        <Atmosphere
          strength={atmosphere}
          background={background}
          style={{ transform: `rotateX(${angle * -1}deg` }}
        />
      )}
      <PlanetElement
        background={background}
        style={{ transform: `rotateX(${angle * -1}deg` }}
      >
        {land && land(size)}
        {glow && glow(size)}
        {clouds && clouds(size)}
      </PlanetElement>

      <Rings>{rings && rings(size)}</Rings>
      {moons && moons(size)}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ size: number; angle: number }>`
  position: absolute;
  width: ${(props) => props.size + 'px'};
  height: ${(props) => props.size + 'px'};
  transform: rotateX(${(props) => props.angle}deg);
  transform-style: preserve-3d;
`;

const PlanetElement = styled.div<{ background: string }>`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${(props) => props.background};
  border-radius: 50%;
  overflow: hidden;
`;

const Atmosphere = styled.div<{ background: string; strength: number }>`
  position: absolute;
  z-index: 0;
  width: 110%;
  height: 110%;
  top: -5%;
  left: -5%;
  background: ${(props) => props.background};
  opacity: ${(props) => props.strength};
  border-radius: 50%;
`;

const Rings = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform-style: preserve-3d;
`;

export default Planet;
