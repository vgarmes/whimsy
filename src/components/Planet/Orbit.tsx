import styled from '@emotion/styled';
import { PropsWithChildren, useEffect, useRef } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  planetSize: number;
  duration: number;
  delay?: number;
}

const Orbit: React.FC<PropsWithChildren<Props>> = ({
  duration = 50e3,
  delay = 0,
  planetSize,
  children,
  ...delegated
}) => {
  const orbiterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!orbiterRef) {
      return;
    }

    const orbitAnimationFrames = [
      { transform: `translateX(${planetSize * -1}px)` },
      { transform: `translateX(${planetSize}px)` },
    ];

    const orbitAnimationTiming = {
      duration,
      delay,
      iterations: Infinity,
    };

    orbiterRef.current?.animate(orbitAnimationFrames, orbitAnimationTiming);
  }, [planetSize, duration, delay]);

  return (
    <Orbiter ref={orbiterRef} {...delegated}>
      {children}
    </Orbiter>
  );
};

const Orbiter = styled.div`
  display: inline-block;
`;

export default Orbit;
