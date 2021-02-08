import MathHelper from "../utils/MathHelper";
import Utils from "../utils/Utils";

export default class ParticleStatus {
  static readonly ALL = new ParticleStatus(0, 'options.particles.all');
  static readonly DESCREASED = new ParticleStatus(1, 'options.particles.decreased');
  static readonly MINIMAL = new ParticleStatus(2, 'options.particles.minimal');

  private static BY_ID: ParticleStatus[] = Object.values(ParticleStatus).sort(Utils.sortIteratable);

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

  public static byId(id: number): ParticleStatus {
    return ParticleStatus.BY_ID[MathHelper.normalizeAngle(id, ParticleStatus.BY_ID.length)];
  }
}