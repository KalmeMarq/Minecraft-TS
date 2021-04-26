import Color from './Color'
import TextFormatting from './TextFormatting'

export default class Style {
  public static EMPTY: Style = new Style(null, null, null, null, null)
  private readonly color: Color | null
  private readonly bold: boolean | null
  private readonly italic: boolean | null
  private readonly underlined: boolean | null
  private readonly strikethrough: boolean | null

  private constructor (color: Color | null, bold: boolean | null, italic: boolean | null, underlined: boolean | null, strikethrough: boolean | null) {
    this.color = color
    this.bold = bold
    this.italic = italic
    this.underlined = underlined
    this.strikethrough = strikethrough
  }

  public getColor (): Color | null {
    return this.color
  }

  public isBold (): boolean {
    return this.bold === true
  }

  public isItalic (): boolean {
    return this.italic === true
  }

  public isStrikethrough (): boolean {
    return this.strikethrough === true
  }

  public isUnderlined (): boolean {
    return this.underlined === true
  }

  public isEmpty (): boolean {
    return this === Style.EMPTY
  }

  public withColor (color: Color | TextFormatting | null): Style {
    return new Style(color instanceof TextFormatting ? Color.fromTextFormatting(color) : color, this.bold, this.italic, this.underlined, this.strikethrough)
  }

  public applyTo (style: Style): Style {
    if (this === Style.EMPTY) {
      return style
    } else {
      return style === Style.EMPTY ? this : new Style(this.color !== null ? this.color : style.color, this.bold !== null ? this.bold : style.bold, this.italic !== null ? this.italic : style.italic, this.underlined !== null ? this.underlined : style.underlined, this.strikethrough !== null ? this.strikethrough : style.strikethrough)
    }
  }

  public applyFormat (formatting: TextFormatting): Style {
    let color: Color | null = this.color
    let bold: boolean | null = this.bold
    let italic: boolean | null = this.italic
    let strikethrough: boolean | null = this.strikethrough
    let underlined: boolean | null = this.underlined
    switch (formatting) {
      case TextFormatting.BOLD:
        bold = true
        break
      case TextFormatting.STRIKETHROUGH:
        strikethrough = true
        break
      case TextFormatting.UNDERLINE:
        underlined = true
        break
      case TextFormatting.ITALIC:
        italic = true
        break
      case TextFormatting.RESET:
        return Style.EMPTY
      default:
        color = Color.fromTextFormatting(formatting)
    }

    return new Style(color, bold, italic, underlined, strikethrough)
  }

  public applyFormats (...formattings: TextFormatting[]): Style {
    let color: Color | null = this.color
    let bold: boolean | null = this.bold
    let italic: boolean | null = this.italic
    let strikethrough: boolean | null = this.strikethrough
    let underline: boolean | null = this.underlined

    for (const textformatting of formattings) {
      switch (textformatting) {
        case TextFormatting.BOLD:
          bold = true
          break
        case TextFormatting.STRIKETHROUGH:
          strikethrough = true
          break
        case TextFormatting.UNDERLINE:
          underline = true
          break
        case TextFormatting.ITALIC:
          italic = true
          break
        case TextFormatting.RESET:
          return Style.EMPTY
        default:
          color = Color.fromTextFormatting(textformatting)
      }
    }

    return new Style(color, bold, italic, underline, strikethrough)
  }
}
