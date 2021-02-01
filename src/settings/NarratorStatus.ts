export default class NarratorStatus {
  protected static AllValues: { [id: number]: NarratorStatus } = {};

  static readonly OFF = new NarratorStatus(0, 'options.narrator.off');
  static readonly ALL = new NarratorStatus(1, 'options.narrator.all');
  static readonly CHAT = new NarratorStatus(2, 'options.narrator.chat');
  static readonly SYSTEM = new NarratorStatus(3, 'options.narrator.system');

  protected constructor(public readonly id: number, public readonly key: string) {
    NarratorStatus.AllValues[id] = this;
  }

  public static byId(id: number): NarratorStatus {
    let ids: number[] = [];
    Object.keys(this.AllValues).forEach((id: any) => ids.push(Number(id)));
    if(id == ids.length) id = 0;
    return this.AllValues[id];
  }
}