import MathHelper from '../util/MathHelper'
import Util from '../util/Util'

export default class ParticleStatus {
  public static readonly ALL = new ParticleStatus(0, 'options.particles.all')
  public static readonly DESCREASED = new ParticleStatus(1, 'options.particles.decreased')
  public  static readonly MINIMAL = new ParticleStatus(2, 'options.particles.minimal')

  private static readonly BY_ID: ParticleStatus[] = Object.values(ParticleStatus).sort(Util.sortIteratable)

  private id: number
  private key: string
  private constructor (id: number, key: string) {
    this.id = id
    this.key = key
  }

  public getId (): number {
    return this.id
  }

  public getKey (): string {
    return this.key
  }

  public static byId (id: number): ParticleStatus {
    return ParticleStatus.BY_ID[MathHelper.positiveModulo(id, ParticleStatus.BY_ID.length)]
  }
}
