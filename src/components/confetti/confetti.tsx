import styles from './confetti.module.css';
import Matter, { Mouse } from 'matter-js';

import DEFAULT_SPRITES from './default-sprites';
import { useEffect, useRef } from 'react';
import usePhysicsEngine from '../../hooks/use-physics-engine.hook';
import { normalize, sample, throttle } from './utils';

const convertDegreesToRadians = (angle: number) => (angle * Math.PI) / 180;

type Sprite = {
  src: string;
  width: number;
  height: number;
  airFrictionMultiplier: number;
};

interface Props {
  position: [number, number];
  enableCollisions: boolean;
  airFriction: number;
  velocity: number;
  angularVelocity: number;
  angle: number;
  spread: number;
  volatility: number;
  duration: number;
  concentration: number;
  sprites?: Array<Sprite>;
}
const Confetti: React.FC<Props> = ({
  position,
  airFriction,
  duration,
  enableCollisions,
  angle,
  spread,
  volatility,
  velocity,
  angularVelocity,
  // The rate of particles fired, specified as # per second
  // 4: slow
  // 15: moderate
  // 30: intense
  concentration,
  sprites = DEFAULT_SPRITES,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { engine } = usePhysicsEngine(canvasRef);

  useEffect(() => {
    if (!engine) {
      return;
    }
    let mousePosition: number[];
    let lastMoveAt: number;

    const handleMouseMove = throttle((event: MouseEvent) => {
      const { clientX, clientY } = event;
      const newMousePosition = [clientX, clientY];
      const newMoveAt = performance.now();

      if (!lastMoveAt) {
        lastMoveAt = newMoveAt;
        mousePosition = newMousePosition;
        return;
      }

      const deltaX = newMousePosition[0] - mousePosition[0];
      const deltaY = newMousePosition[1] - mousePosition[1];

      const deltaTime = newMoveAt - lastMoveAt;

      const xPerSecond = (deltaX * 1000) / deltaTime;
      const yPerSecond = (deltaY * 1000) / deltaTime;

      lastMoveAt = newMoveAt;
      mousePosition = newMousePosition;

      Matter.Composite.allBodies(engine.world).forEach((body) => {
        const aSquared = Math.pow(clientX - body.position.x, 2);
        const bSquared = Math.pow(clientY - body.position.y, 2);
        const distanceToMouse = Math.sqrt(aSquared + bSquared);

        const dampening = (1 / distanceToMouse) * 0.1;

        Matter.Body.setVelocity(body, {
          x: body.velocity.x + xPerSecond * dampening,
          y: body.velocity.y + yPerSecond * dampening,
        });
      });
    }, 80);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [engine]);

  useEffect(() => {
    const [top, left] = position;

    if (!engine) {
      return;
    }

    const timePerFrame = 1000 / concentration;

    const startAt = performance.now();

    let intervalId = window.setInterval(() => {
      if (performance.now() - startAt > duration) {
        window.clearInterval(intervalId);
        return;
      }

      const sprite = sample(sprites);

      let confettiSettings: Matter.IChamferableBodyDefinition = {
        frictionAir: airFriction,
        render: {
          sprite: {
            texture: sprite.src,
            xScale: 1,
            yScale: 1,
          },
        },
      };

      if (!enableCollisions) {
        confettiSettings.collisionFilter = {
          category: undefined,
        };
      }

      const confettiPiece = Matter.Bodies.rectangle(
        top,
        left,
        sprite.width,
        sprite.height,
        confettiSettings
      );

      const spreadPercentile = Math.random();
      const velocityPercentile = Math.random();

      const imperfectAngle = normalize(
        spreadPercentile,
        0,
        1,
        angle - spread / 2,
        angle + spread / 2
      );

      let imperfectVelocity = normalize(
        velocityPercentile,
        0,
        1,
        velocity - velocity * volatility,
        velocity + velocity * volatility
      );

      const angleInRads = convertDegreesToRadians(imperfectAngle);

      const x = Math.cos(angleInRads) * imperfectVelocity;
      const y = Math.sin(angleInRads) * imperfectVelocity;

      Matter.Body.setVelocity(confettiPiece, { x, y });

      const imperfectAngularVelocity = angularVelocity * velocityPercentile;

      Matter.Body.setAngularVelocity(confettiPiece, imperfectAngularVelocity);

      Matter.World.add(engine.world, [confettiPiece]);
    }, timePerFrame);

    return () => window.clearInterval(intervalId);
  });

  useEffect(() => {
    if (!engine) {
      return;
    }
    const BUFFER = 100;
    const intervalId = window.setInterval(() => {
      Matter.Composite.allBodies(engine.world).forEach((body) => {
        if (body.position.y > window.innerHeight + BUFFER) {
          Matter.World.remove(engine.world, body);
        }
      });
    }, 500);

    return () => window.clearInterval(intervalId);
  }, [engine]);
  return (
    <div className={styles.wrapper}>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </div>
  );
};

export default Confetti;
