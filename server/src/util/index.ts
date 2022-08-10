export function getRandom(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getRandomResult(successRatio: number): boolean {
  return Math.random() < successRatio;
}
