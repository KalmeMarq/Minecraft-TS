
export default class PlayerModelPart {
  public static readonly CAPE = new PlayerModelPart(0, 'cape')
  public static readonly JACKET = new PlayerModelPart(1, 'jacket')
  public static readonly LEFT_SLEEVE = new PlayerModelPart(2, 'left_sleeve')
  public static readonly RIGHT_SLEEVE = new PlayerModelPart(3, 'right_sleeve')
  public static readonly LEFT_PANTS_LEG = new PlayerModelPart(4, 'left_pants_leg')
  public static readonly RIGHT_PANTS_LEG = new PlayerModelPart(5, 'right_pants_leg')
  public static readonly HAT = new PlayerModelPart(6, 'hat')

  private readonly partId
  private readonly mask
  private readonly partName
  private readonly name

  private constructor (partIdIn: number, partNameIn: string) {
    this.partId = partIdIn
    this.mask = 1 << partIdIn
    this.partName = partNameIn
    this.name = 'options.modelPart.' + partNameIn
  }

  public getPartMask (): number {
    return this.mask
  }

  public getPartName (): string {
    return this.partName
  }

  public getName (): string {
    return this.name
  }
}
