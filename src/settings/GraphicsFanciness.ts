import MathHelper from "../utils/MathHelper";
import Utils from "../utils/Utils";

export default class GraphicsFanciness {
  static readonly FAST = new GraphicsFanciness(0, 'options.graphics.fast');
  static readonly FANCY = new GraphicsFanciness(1, 'options.graphics.fancy');
  static readonly FABULOUS = new GraphicsFanciness(2, 'options.graphics.fabulous');

  private static BY_ID: GraphicsFanciness[] = Object.values(GraphicsFanciness).sort(Utils.sortIteratable);

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

  public static byId(id: number): GraphicsFanciness {
    return GraphicsFanciness.BY_ID[MathHelper.normalizeAngle(id, GraphicsFanciness.BY_ID.length)];
  }
}