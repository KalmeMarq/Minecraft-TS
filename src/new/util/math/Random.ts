export default class Random {
  constructor() {}

  public nextInt(max: number): number {
    return Math.round(this.nextFloat(max));
  }

  public nextFloat(max: number): number {
    return Math.random() * max;
  }
}