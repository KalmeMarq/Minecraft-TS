import MathHelper from '../../util/MathHelper'
import Util from '../../util/Util'

export default class CloudOption {
  public static readonly OFF = new CloudOption(0, 'options.off')
  public static readonly FAST = new CloudOption(1, 'options.clouds.fast')
  public static readonly FANCY = new CloudOption(2, 'options.clouds.fancy')

  private static readonly BY_ID: CloudOption[] = Object.values(CloudOption).sort(Util.sortIteratable)

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

  public static byId (id: number): CloudOption {
    return CloudOption.BY_ID[MathHelper.positiveModulo(id, CloudOption.BY_ID.length)]
  }
}
