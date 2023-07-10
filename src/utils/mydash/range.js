export function rangeRight(start = 0, end, step) {
  return range(start, end, step, true);
}

export function range(start = 0, end, step, isRight) {
  if (!end) {
    end = start;
    start = 0;
  }

  let length = Math.floor(Math.abs((end - start) / (step || 1)));
  const arr = Array(length);

  step = step === undefined ? (start < end ? 1 : -1) : step;

  let index = -1;

  while (length--) {
    arr[isRight ? length : ++index] = start;
    start += step;
  }

  return arr;
}
