import Matter from 'matter-js';
import { RefObject, useEffect, useState } from 'react';

export default function usePhysicsEngine(ref: RefObject<HTMLCanvasElement>) {
  const [engine, setEngine] = useState<Matter.Engine>();
  const [renderer, setRenderer] = useState<Matter.Render>();

  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    const engine = Matter.Engine.create();
    const renderer = Matter.Render.create({
      canvas: ref.current,
      engine,
      options: {
        width: ref.current.width,
        height: ref.current.height,
        wireframes: false,
        background: 'transparent',
      },
    });

    Matter.Render.run(renderer);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    setEngine(engine);
    setRenderer(renderer);
  }, []);

  return { engine, renderer };
}
