export default class HandSide {
  protected static AllValues: { [id: number]: HandSide } = {};

  static readonly LEFT = new HandSide(0, 'options.mainHand.left');
  static readonly RIGHT = new HandSide(1, 'options.mainHand.right');

  protected constructor(public readonly id: number, public readonly key: string) {
    HandSide.AllValues[id] = this;
  }

  public static byId(id: number): HandSide {
    let ids: number[] = [];
    Object.keys(this.AllValues).forEach((id: any) => ids.push(Number(id)));
    if(id == ids.length) id = 0;
    return this.AllValues[id];
  }
}