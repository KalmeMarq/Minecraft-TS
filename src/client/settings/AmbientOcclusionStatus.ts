import MathHelper from '../../util/MathHelper'
import Util from '../../util/Util'

export default class AmbientOcclusionStatus {
  public static readonly OFF = new AmbientOcclusionStatus(0, 'options.ao.off')
  public static readonly MIN = new AmbientOcclusionStatus(1, 'options.ao.min')
  public static readonly MAX = new AmbientOcclusionStatus(2, 'options.ao.max')

  private static readonly BY_ID: AmbientOcclusionStatus[] = Object.values(AmbientOcclusionStatus).sort(Util.sortIteratable)

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

  public static byId (id: number): AmbientOcclusionStatus {
    return AmbientOcclusionStatus.BY_ID[MathHelper.positiveModulo(id, AmbientOcclusionStatus.BY_ID.length)]
  }
}
