export default class EnumOption {
  protected static AllValues: {[id: number]: EnumOption } = {};

  protected constructor(public readonly id: number, public readonly key: string) {
    EnumOption.AllValues[id] = this;
  }

  public static byId(id: number): EnumOption {
    let ids: number[] = [];
    Object.keys(this.AllValues).forEach((id: any) => ids.push(Number(id)));
    if(id == ids.length) id = 0;
    return this.AllValues[id];
  }
}