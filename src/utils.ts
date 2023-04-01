export const normalize = (
  currentNumber: number,
  currentScaleMin: number,
  currentScaleMax: number,
  newScaleMin: number = 0,
  newScaleMax: number = 1
) => {
  const standardNormalization =
    (currentNumber - currentScaleMin) / (currentScaleMax - currentScaleMin);

  return (newScaleMax - newScaleMin) * standardNormalization + newScaleMin;
};

export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export const sample = <T>(arr: Array<T>) =>
  arr[Math.floor(Math.random() * arr.length)];

export const throttle = (func: Function, limit: number = 300) => {
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;

  return function (this: any) {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, Math.max(limit - (Date.now() - lastRan), 0));
    }
  };
};
