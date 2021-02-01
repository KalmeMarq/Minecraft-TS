export default class SneakOption {
  protected static AllValues: { [id: number]: SneakOption } = {};

  static readonly HOLD = new SneakOption(0, 'options.key.hold');
  static readonly TOGGLE = new SneakOption(1, 'options.key.toggle');

  protected constructor(public readonly id: number, public readonly key: string) {
    SneakOption.AllValues[id] = this;
  }

  public static byId(id: number): SneakOption {
    let ids: number[] = [];
    Object.keys(this.AllValues).forEach((id: any) => ids.push(Number(id)));
    if(id == ids.length) id = 0;
    return this.AllValues[id];
  }
}