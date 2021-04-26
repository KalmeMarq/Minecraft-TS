import CustomMap from '../CustomMap'
import Util from '../Util'

export default class TextFormatting {
  public static readonly BLACK = new TextFormatting('BLACK', '0', 0, 0, 'black')
  public static readonly DARK_BLUE = new TextFormatting('DARK_BLUE', '1', 1, 170, 'rgba(0, 0, 170, 1)')
  public static readonly DARK_GREEN = new TextFormatting('DARK_GREEN', '2', 2, 43520, 'rgba(0, 170, 0, 1)')
  public static readonly DARK_AQUA = new TextFormatting('DARK_AQUA', '3', 3, 43690, 'rgba(0, 170, 170, 1)')
  public static readonly DARK_RED = new TextFormatting('DARK_RED', '4', 4, 11141120, 'rgba(170, 0, 0, 1)')
  public static readonly DARK_PURPLE = new TextFormatting('DARK_PURPLE', '5', 5, 11141290, 'rgba(170, 0, 170, 1)')
  public static readonly GOLD = new TextFormatting('GOLD', '6', 6, 16755200, 'rgba(255, 170, 0, 1)')
  public static readonly GRAY = new TextFormatting('GRAY', '7', 7, 11184810, 'rgba(170, 170, 170, 1)')
  public static readonly DARK_GRAY = new TextFormatting('DARK_GRAY', '8', 8, 5592405, 'rgba(85, 85, 85, 1)')
  public static readonly BLUE = new TextFormatting('BLUE', '9', 9, 5592575, 'rgba(85, 85, 255, 1)')
  public static readonly GREEN = new TextFormatting('GREEN', 'a', 10, 5635925, 'rgba(85, 255, 85, 1)')
  public static readonly AQUA = new TextFormatting('AQUA', 'b', 11, 5636095, 'rgba(85, 255, 255, 1)')
  public static readonly RED = new TextFormatting('RED', 'c', 12, 16733525, 'rgba(255, 85, 85, 1)')
  public static readonly LIGHT_PURPLE = new TextFormatting('LIGHT_PURPLE', 'd', 13, 16733695, 'rgba(255, 85, 255, 1)')
  public static readonly YELLOW = new TextFormatting('YELLOW', 'd', 14, 16777045, 'rgba(255, 255, 85, 1)')
  public static readonly WHITE = new TextFormatting('WHITE', 'e', 15, 16777215, 'rgba(255, 255, 255, 1)')
  public static readonly BOLD = new TextFormatting('BOLD', 'l', true)
  public static readonly STRIKETHROUGH = new TextFormatting('STRIKETHROUGH', 'm', true)
  public static readonly UNDERLINE = new TextFormatting('UNDERLINE', 'n', true)
  public static readonly ITALIC = new TextFormatting('ITALIC', 'o', true)
  public static readonly RESET = new TextFormatting('RESET', 'r', -1, null)

  private static readonly FORMATTING_BY_NAME: CustomMap<string, TextFormatting> = Util.arrayToMap(Object.values(TextFormatting), (value) => {
    return TextFormatting.cleanName(value.name)
  })

  private readonly id: number
  private readonly name: string
  private readonly color: string
  private readonly newcolor: number | null
  private readonly isFormat: boolean
  private readonly toString: string

  private constructor (name: string, key: string, idOrIsFormat: number | boolean);
  private constructor (name: string, key: string, idOrIsFormat: number | boolean, newcolor?: number | null);
  private constructor (name: string, key: string, idOrIsFormat: number | boolean, newcolor?: number | null, color?: string);
  private constructor (name: string, key: string, idOrIsFormat: number | boolean, newcolor?: number | null, color?: string) {
    this.name = name
    this.id = idOrIsFormat as number
    this.color = color ?? ''
    this.newcolor = newcolor ?? null
    this.isFormat = typeof idOrIsFormat === 'number' ? false : idOrIsFormat
    this.toString = `\u00a7${key}`
  }

  public getColor (): string {
    return this.color
  }

  public getNewColor (): number | null {
    return this.newcolor
  }

  public getName (): string {
    return this.name.toLowerCase()
  }

  public isColor (): boolean {
    return !this.isFormat && this !== TextFormatting.RESET
  }

  private static cleanName (name: string): string {
    return name.toLowerCase().replace(/[^ag-z]/, '')
  }

  public static getByName (name: null | string): TextFormatting | null {
    return name === null ? null : TextFormatting.FORMATTING_BY_NAME.get(TextFormatting.cleanName(name)) as TextFormatting
  }
}
