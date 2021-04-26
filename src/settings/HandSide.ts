import MathHelper from '../util/MathHelper'
import Util from '../util/Util'

export default class HandSide {
  public static readonly LEFT = new HandSide(0, 'options.mainHand.left')
  public static readonly RIGHT = new HandSide(1, 'options.mainHand.right')

  private static readonly BY_ID: HandSide[] = Object.values(HandSide).sort(Util.sortIteratable)

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

  public static byId (id: number): HandSide {
    return HandSide.BY_ID[MathHelper.positiveModulo(id, HandSide.BY_ID.length)]
  }
}
