export default class CloudOption {
  protected static AllValues: { [id: number]: CloudOption } = {};

  static readonly OFF = new CloudOption(0, 'options.off');
  static readonly FAST = new CloudOption(1, 'options.clouds.fast');
  static readonly FANCY = new CloudOption(2, 'options.clouds.fancy');

  protected constructor(public readonly id: number, public readonly key: string) {
    CloudOption.AllValues[id] = this;
  }

  public static byId(id: number): CloudOption {
    let ids: number[] = [];
    Object.keys(this.AllValues).forEach((id: any) => ids.push(Number(id)));
    if(id == ids.length) id = 0;
    return this.AllValues[id];
  }
}