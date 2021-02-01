export default class ParticleStatus {
  protected static AllValues: { [id: number]: ParticleStatus } = {};

  static readonly ALL = new ParticleStatus(0, 'options.particles.all');
  static readonly DESCREASED = new ParticleStatus(1, 'options.particles.decreased');
  static readonly MINIMAL = new ParticleStatus(2, 'options.particles.minimal');

  protected constructor(public readonly id: number, public readonly key: string) {
    ParticleStatus.AllValues[id] = this;
  }

  public static byId(id: number): ParticleStatus {
    let ids: number[] = [];
    Object.keys(this.AllValues).forEach((id: any) => ids.push(Number(id)));
    if(id == ids.length) id = 0;
    return this.AllValues[id];
  }
}