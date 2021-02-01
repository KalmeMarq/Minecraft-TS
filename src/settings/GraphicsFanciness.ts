export default class GraphicsFanciness {
  protected static AllValues: { [id: number]: GraphicsFanciness } = {};

  static readonly FAST = new GraphicsFanciness(0, 'options.graphics.fast');
  static readonly FANCY = new GraphicsFanciness(1, 'options.graphics.fancy');
  static readonly FABULOUS = new GraphicsFanciness(2, 'options.graphics.fabulous');

  protected constructor(public readonly id: number, public readonly key: string) {
    GraphicsFanciness.AllValues[id] = this;
  }

  public static byId(id: number): GraphicsFanciness {
    let ids: number[] = [];
    Object.keys(this.AllValues).forEach((id: any) => ids.push(Number(id)));
    if(id == ids.length) id = 0;
    return this.AllValues[id];
  }
}