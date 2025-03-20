export class SlugService {
  constructor() {}

  public generate(): string {
    return Math.random().toString();
  }
}
