import MathHelper from '../../util/MathHelper'
import Util from '../../util/Util'

export default class GraphicsFanciness {
  public static readonly FAST = new GraphicsFanciness(0, 'options.graphics.fast')
  public static readonly FANCY = new GraphicsFanciness(1, 'options.graphics.fancy')
  public static readonly FABULOUS = new GraphicsFanciness(2, 'options.graphics.fabulous')

  private static readonly BY_ID: GraphicsFanciness[] = Object.values(GraphicsFanciness).sort(Util.sortIteratable)

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

  public static byId (id: number): GraphicsFanciness {
    return GraphicsFanciness.BY_ID[MathHelper.positiveModulo(id, GraphicsFanciness.BY_ID.length)]
  }
}
