import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import Color from 'color';

interface Props {
  size?: number;
  planetSize: number;
  background?: string;
  offset?: number;
  tilt?: number;
  orbitDuration?: number;
  orbitDelay?: number;
  orbitDirection?: 'clockwise' | 'counter-clockwise';
}

const PlanetMoon: React.FC<Props> = ({
  size = 10,
  planetSize,
  background = '#EEE',
  offset = 50,
  tilt = 0,
  orbitDuration = 10000,
  orbitDelay = 0,
  orbitDirection = 'counter-clockwise',
}) => {
  const orbitRef = useRef<HTMLDivElement>(null);
  const colorObj = Color(background);

  useEffect(() => {
    if (!orbitRef) {
      return;
    }

    const orbitAnimationFrames = [
      { transform: `rotateY(${tilt}deg) rotateZ(0deg) ` },
      {
        transform: `rotateY(${tilt}deg) rotateZ(${
          orbitDirection === 'clockwise' ? 360 : -360
        }deg) `,
      },
    ];

    const orbitAnimationTiming = {
      duration: orbitDuration,
      delay: orbitDelay,
      iterations: Infinity,
    };

    orbitRef.current?.animate(orbitAnimationFrames, orbitAnimationTiming);
  }, [tilt, orbitDirection, orbitDuration, orbitDelay]);

  return (
    <Wrapper planetSize={planetSize} offset={offset} size={size}>
      <Orbit ref={orbitRef}>
        <Moon size={size}>
          <Top color={colorObj.string()} radius={size / 2} />
          <Back color={colorObj.darken(0.5).string()} radius={size / 2} />
          <Front color={colorObj.darken(0.15).string()} radius={size / 2} />
          <Bottom color={colorObj.darken(0.75).string()} radius={size / 2} />
          <Left color={colorObj.darken(0.35).string()} radius={size / 2} />
          <Right color={colorObj.darken(0.35).string()} radius={size / 2} />
        </Moon>
      </Orbit>
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  offset: number;
  size: number;
  planetSize: number;
}>`
  position: absolute;
  top: ${(props) => (props.offset + props.size) * -1}px;
  left: ${(props) => (props.offset + props.size) * -1}px;
  width: ${(props) => props.planetSize + props.offset * 2 + props.size * 2}px;
  height: ${(props) => props.planetSize + props.offset * 2 + props.size * 2}px;
  transform-style: preserve-3d;
`;

const Orbit = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform-style: preserve-3d;
  will-change: transform;
`;

const Moon = styled.div<{ size: number }>`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  transform-style: preserve-3d;
`;

const Side = styled.figure`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: white;
`;

const Top = styled(Side)<{ radius: number }>`
  transform: rotateY(0deg) translateZ(${(p) => p.radius}px);
  background: ${(props) => props.color};
`;
const Bottom = styled(Side)<{ radius: number }>`
  transform: rotateX(180deg) translateZ(${(p) => p.radius}px);
  background: ${(props) => props.color};
`;
const Front = styled(Side)<{ radius: number }>`
  transform: rotateX(90deg) translateZ(${(p) => p.radius}px);
  background: ${(props) => props.color};
`;
const Back = styled(Side)<{ radius: number }>`
  transform: rotateX(-90deg) translateZ(${(p) => p.radius}px);
  background: ${(props) => props.color};
`;
const Left = styled(Side)<{ radius: number }>`
  transform: rotateY(90deg) translateZ(${(p) => p.radius}px);
  background: ${(props) => props.color};
`;
const Right = styled(Side)<{ radius: number }>`
  transform: rotateY(-90deg) translateZ(${(p) => p.radius}px);
  background: ${(props) => props.color};
`;

export default PlanetMoon;
