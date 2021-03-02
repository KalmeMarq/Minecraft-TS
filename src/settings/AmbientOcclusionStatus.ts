import MathHelper from '@mcsrc/new/util/MathHelper';
import Util from '@mcsrc/util/Util';

export default class AmbientOcclusionStatus {
  static readonly OFF = new AmbientOcclusionStatus(0, 'options.ao.off');
  static readonly MIN = new AmbientOcclusionStatus(1, 'options.ao.min');
  static readonly MAX = new AmbientOcclusionStatus(2, 'options.ao.max');

  private static BY_ID: AmbientOcclusionStatus[] = Object.values(AmbientOcclusionStatus).sort(Util.sortIteratable);

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

  public static byId(id: number): AmbientOcclusionStatus {
    return AmbientOcclusionStatus.BY_ID[MathHelper.normalizeAngle(id, AmbientOcclusionStatus.BY_ID.length)];
  }
}