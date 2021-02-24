import MathHelper from '@km.mcts/util/MathHelper';
import Util from '@km.mcts/util/Util';

export default class CloudOption {
  static readonly OFF = new CloudOption(0, 'options.off');
  static readonly FAST = new CloudOption(1, 'options.clouds.fast');
  static readonly FANCY = new CloudOption(2, 'options.clouds.fancy');

  private static BY_ID: CloudOption[] = Object.values(CloudOption).sort(Util.sortIteratable);

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

  public static byId(id: number): CloudOption {
    return CloudOption.BY_ID[MathHelper.normalizeAngle(id, CloudOption.BY_ID.length)];
  }
}