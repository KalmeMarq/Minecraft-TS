import MathHelper from "../utils/MathHelper";
import Utils from "../utils/Utils";

export default class PointOfView {
  static readonly FIRST_PERSON = new PointOfView(0, 'FIRST_PERSON');
  static readonly THIRD_PERSON_BACK = new PointOfView(1, 'THIRD_PERSON_BACK');
  static readonly THIRD_PERSON_FRONT = new PointOfView(2, 'THIRD_PERSON_FRONT');

  private static BY_ID: PointOfView[] = Object.values(PointOfView).sort(Utils.sortIteratable);

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

  public static byId(id: number): PointOfView {
    return PointOfView.BY_ID[MathHelper.normalizeAngle(id, PointOfView.BY_ID.length)];
  }
}