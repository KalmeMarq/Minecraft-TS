import MathHelper from '../../util/MathHelper'
import Util from '../../util/Util'

export default class PointOfView {
  public static readonly FIRST_PERSON = new PointOfView(0, 'FIRST_PERSON')
  public static readonly THIRD_PERSON_BACK = new PointOfView(1, 'THIRD_PERSON_BACK')
  public static readonly THIRD_PERSON_FRONT = new PointOfView(2, 'THIRD_PERSON_FRONT')

  private static readonly BY_ID: PointOfView[] = Object.values(PointOfView).sort(Util.sortIteratable)

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

  public static byId (id: number): PointOfView {
    return PointOfView.BY_ID[MathHelper.positiveModulo(id, PointOfView.BY_ID.length)]
  }
}
