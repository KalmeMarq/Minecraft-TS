export enum ColorType {
  RGBA,
  RGB,
  HEX,
  HEXA,
  ArrayRGBA
}

export default class ColorHelper {
  public static PackedColor = class PackedColor {
    public static alpha (value: number): number {
      return value >>> 24
    }

    public static red (value: number): number {
      return value >> 16 & 255
    }

    public static green (value: number): number {
      return value >> 8 & 255
    }

    public static blue (value: number): number {
      return value & 255
    }

    public static color (alpha: number, red: number, green: number, blue: number): number {
      return alpha << 24 | red << 16 | green << 8 | blue
    }

    public static multiply (color1: number, color2: number): number {
      return this.color(this.alpha(color1) * this.alpha(color2) / 255, this.red(color1) * this.red(color2) / 255, this.green(color1) * this.green(color2) / 255, this.blue(color1) * this.blue(color2) / 255)
    }
  }

  public static UnpackedColor = class UnpackedColor {
    public static hexValue (value: number): string {
      return `00${value.toString(16)}`.slice(2)
    }

    public static color (color: number, type: ColorType = ColorType.RGBA): string | number[] {
      switch (type) {
        case ColorType.RGBA:
          return `rgba(${ColorHelper.PackedColor.red(color)}, ${ColorHelper.PackedColor.green(color)}, ${ColorHelper.PackedColor.blue(color)}, ${ColorHelper.PackedColor.alpha(color) / 255})`
        case ColorType.RGB:
          return `rgb(${ColorHelper.PackedColor.red(color)}, ${ColorHelper.PackedColor.green(color)}, ${ColorHelper.PackedColor.blue(color)})`
        case ColorType.HEXA:
          return `#${this.hexValue(ColorHelper.PackedColor.red(color))}${this.hexValue(ColorHelper.PackedColor.green(color))}${this.hexValue(ColorHelper.PackedColor.blue(color))}${this.hexValue(ColorHelper.PackedColor.alpha(color))}`
        case ColorType.HEX:
          return `#${this.hexValue(ColorHelper.PackedColor.red(color))}${this.hexValue(ColorHelper.PackedColor.green(color))}${this.hexValue(ColorHelper.PackedColor.blue(color))}`
        case ColorType.ArrayRGBA:
          return [ColorHelper.PackedColor.alpha(color) / 255, ColorHelper.PackedColor.red(color), ColorHelper.PackedColor.green(color), ColorHelper.PackedColor.blue(color)]
      }
    }
  }
}
