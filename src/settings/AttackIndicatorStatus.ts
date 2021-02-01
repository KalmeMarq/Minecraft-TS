export default class AttackIndicatorStatus {
  protected static AllValues: { [id: number]: AttackIndicatorStatus } = {};

  static readonly OFF = new AttackIndicatorStatus(0, 'options.off');
  static readonly CROSSHAIR = new AttackIndicatorStatus(1, 'options.attack.crosshair');
  static readonly HOTBAR = new AttackIndicatorStatus(2, 'options.attack.hotbar');

  protected constructor(public readonly id: number, public readonly key: string) {
    AttackIndicatorStatus.AllValues[id] = this;
  }

  public static byId(id: number): AttackIndicatorStatus {
    let ids: number[] = [];
    Object.keys(this.AllValues).forEach((id: any) => ids.push(Number(id)));
    if(id == ids.length) id = 0;
    return this.AllValues[id];
  }
}