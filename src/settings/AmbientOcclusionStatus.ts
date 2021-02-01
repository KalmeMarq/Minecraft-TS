export default class AmbientOcclusionStatus {
  protected static AllValues: { [id: number]: AmbientOcclusionStatus } = {};

  static readonly OFF = new AmbientOcclusionStatus(0, 'options.ao.off');
  static readonly MIN = new AmbientOcclusionStatus(1, 'options.ao.min');
  static readonly MAX = new AmbientOcclusionStatus(2, 'options.ao.max');

  protected constructor(public readonly id: number, public readonly key: string) {
    AmbientOcclusionStatus.AllValues[id] = this;
  }

  public static byId(id: number): AmbientOcclusionStatus {
    let ids: number[] = [];
    Object.keys(this.AllValues).forEach((id: any) => ids.push(Number(id)));
    if(id == ids.length) id = 0;
    return this.AllValues[id];
  }
}