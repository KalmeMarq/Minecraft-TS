import MathHelper from '../../util/MathHelper'
import Util from '../../util/Util'

export default class NarratorStatus {
  public static readonly OFF = new NarratorStatus(0, 'options.narrator.off')
  public static readonly ALL = new NarratorStatus(1, 'options.narrator.all')
  public static readonly CHAT = new NarratorStatus(2, 'options.narrator.chat')
  public static readonly SYSTEM = new NarratorStatus(3, 'options.narrator.system')

  private static readonly BY_ID: NarratorStatus[] = Object.values(NarratorStatus).sort(Util.sortIteratable)

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

  public static byId (id: number): NarratorStatus {
    return NarratorStatus.BY_ID[MathHelper.positiveModulo(id, NarratorStatus.BY_ID.length)]
  }
}
