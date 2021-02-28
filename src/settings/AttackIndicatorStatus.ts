import MathHelper from '@mcsrc/util/MathHelper';
import Util from '@mcsrc/util/Util';

export default class AttackIndicatorStatus {
  static readonly OFF = new AttackIndicatorStatus(0, 'options.off');
  static readonly CROSSHAIR = new AttackIndicatorStatus(1, 'options.attack.crosshair');
  static readonly HOTBAR = new AttackIndicatorStatus(2, 'options.attack.hotbar');

  private static BY_ID: AttackIndicatorStatus[] = Object.values(AttackIndicatorStatus).sort(Util.sortIteratable);

  public id: number;
  public key: string;
  private constructor(id: number, key: string) {
    this.id = id;
    this.key = key;
  }

  public getId(): number {
    return this.id;
  }

  public getKey() {
    return this.key;
  }

  public static byId(id: number): AttackIndicatorStatus {
    return AttackIndicatorStatus.BY_ID[MathHelper.normalizeAngle(id, AttackIndicatorStatus.BY_ID.length)];
  }
}