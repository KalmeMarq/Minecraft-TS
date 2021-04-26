import MathHelper from '../util/MathHelper'
import Util from '../util/Util'

export default class AttackIndicatorStatus {
  public static readonly OFF = new AttackIndicatorStatus(0, 'options.off')
  public static readonly CROSSHAIR = new AttackIndicatorStatus(1, 'options.attack.crosshair')
  public static readonly HOTBAR = new AttackIndicatorStatus(2, 'options.attack.hotbar')

  private static readonly BY_ID: AttackIndicatorStatus[] = Object.values(AttackIndicatorStatus).sort(Util.sortIteratable)

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

  public static byId (id: number): AttackIndicatorStatus {
    return AttackIndicatorStatus.BY_ID[MathHelper.positiveModulo(id, AttackIndicatorStatus.BY_ID.length)]
  }
}
