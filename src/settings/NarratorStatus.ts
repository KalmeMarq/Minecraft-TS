import MathHelper from '@mcsrc/util/MathHelper';
import Util from '@mcsrc/util/Util';

export default class NarratorStatus {
  static readonly OFF = new NarratorStatus(0, 'options.narrator.off');
  static readonly ALL = new NarratorStatus(1, 'options.narrator.all');
  static readonly CHAT = new NarratorStatus(2, 'options.narrator.chat');
  static readonly SYSTEM = new NarratorStatus(3, 'options.narrator.system');

  private static BY_ID: NarratorStatus[] = Object.values(NarratorStatus).sort(Util.sortIteratable);

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

  public static byId(id: number): NarratorStatus {
    return NarratorStatus.BY_ID[MathHelper.normalizeAngle(id, NarratorStatus.BY_ID.length)];
  }
}