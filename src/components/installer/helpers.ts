// Our height will be 1/2 of our width.
// This is so we end up with 2 squares:
//  ______________
// |      |      |
// |      |      |

import { random } from '../../utils';
import { Point } from './types';

// |______|______|
export const getHeight = (width: number) => width / 2;

export const getPlanetPoint = (width: number) => ({
  x: width / 4,
  y: getHeight(width) * 0.5,
});

// The folderPoint is used purely for where files should wind up.
// We want them to be slightly above the actual center, so that they
// stick out of the top, and not out of the bottom.
export const getFolderPoint = (width: number) => ({
  x: width * (3 / 4),
  y: getHeight(width) * 0.5 - 4,
});

export const getPixelsPerTick = (width: number) => width * 0.0075;

export const generateFlightPath = (
  width: number,
  height: number,
  startPoint: Point,
  endPoint: Point
) => {
  // We can imagine this as an SVG created that spans the size of our area.
  //  ____________________________________
  // |                                    |
  // |      P                      F      |
  // |                                    |
  // |____________________________________|
  //
  // We want to draw a quadratic bezier curve between the two, arcing up
  // slightly.
  const minControlY = height * -0.2;
  const maxControlY = height * 0.35;

  const controlPoint = {
    x: width * 0.5,
    y: random(minControlY, maxControlY),
  };

  return { startPoint, endPoint, controlPoint };
};
