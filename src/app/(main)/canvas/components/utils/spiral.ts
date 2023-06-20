type Point = [number, number];

export function generateSpiral(n: number): Point[] {
  const result: Point[] = [];
  let x = 0,
    y = 0,
    dx = 0,
    dy = -1;
  const maxSteps = Math.ceil(Math.sqrt(n));

  for (let i = 0; i < maxSteps * maxSteps; i++) {
    if (
      -maxSteps / 2 <= x &&
      x <= maxSteps / 2 &&
      -maxSteps / 2 <= y &&
      y <= maxSteps / 2
    ) {
      result.push([x, y]);
      if (result.length === n) {
        break;
      }
    }

    if (x === y || (x < 0 && x === -y) || (x > 0 && x === 1 - y)) {
      [dx, dy] = [-dy, dx]; // corner, change direction
    }

    x += dx;
    y += dy;
  }

  return result;
}
