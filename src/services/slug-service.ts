export class SlugService {
  constructor() {}

  public generate(): string {
    return getRandomIntegerInclusive(0, 100).toString();
  }
}

const getRandomIntegerInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
