import MathHelper from '@mcsrc/util/MathHelper';
import Util from '@mcsrc/util/Util';

export default class HandSide {
  static readonly LEFT = new HandSide(0, 'options.mainHand.left');
  static readonly RIGHT = new HandSide(1, 'options.mainHand.right');

  private static BY_ID: HandSide[] = Object.values(HandSide).sort(Util.sortIteratable);

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

  public static byId(id: number): HandSide {
    return HandSide.BY_ID[MathHelper.normalizeAngle(id, HandSide.BY_ID.length)];
  }
}