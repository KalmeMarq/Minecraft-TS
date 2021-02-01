export default class SprintOption {
  protected static AllValues: { [id: number]: SprintOption } = {};

  static readonly HOLD = new SprintOption(0, 'options.key.hold');
  static readonly TOGGLE = new SprintOption(1, 'options.key.toggle');

  protected constructor(public readonly id: number, public readonly key: string) {
    SprintOption.AllValues[id] = this;
  }

  public static byId(id: number): SprintOption {
    let ids: number[] = [];
    Object.keys(this.AllValues).forEach((id: any) => ids.push(Number(id)));
    if(id == ids.length) id = 0;
    return this.AllValues[id];
  }
}