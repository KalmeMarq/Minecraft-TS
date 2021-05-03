import CustomMap from '../CustomMap'
import Util from '../Util'
import TextFormatting from './TextFormatting'

export default class Color {
  public static LEGACY_FORMAT_TO_COLOR: CustomMap<TextFormatting, Color> = Util.arrayToMap(Object.values(TextFormatting), (value) => {
    return new Color(value.color, value.name)
  })

  private static readonly NAMED_COLORS: CustomMap<string, Color> = Util.arrayToMap(Array.from(Color.LEGACY_FORMAT_TO_COLOR.values()), (value) => {
    return value.name
  })

  private readonly name: string | null
  private readonly value: number

  private constructor (value: number, name: string | null = null) {
    this.value = value
    this.name = name
  }

  public getValue (): number {
    return this.value
  }

  private formatValue (): string {
    return Util.format('#%06X', this.value)
  }

  public static fromTextFormatting (format: TextFormatting): Color {
    return Color.LEGACY_FORMAT_TO_COLOR.get(format) ?? new Color(0, null)
  }
}
