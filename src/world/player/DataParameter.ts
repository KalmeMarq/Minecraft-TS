
export default class DataParameter<T> {
  private readonly id: number;

  public constructor(id: number) {
    this.id = id;
  }

  public getId(): number {
    return this.id;
  }

  public equals(equalsTo: Object): boolean {
    if (this == equalsTo) {
      return true;
    } else if (equalsTo !== undefined) {
      let dataparameter = equalsTo as DataParameter<any>;
      return this.id === dataparameter.id;
    } else {
      return false;
    }
  }

  public toString(): string {
    return `<entity data: ${this.id}>`;
  }
}