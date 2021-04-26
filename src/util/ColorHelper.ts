export default class ColorHelper {
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

  public static rgbaToDecimal (a: number, r: number, g: number, b: number): number {
    return a << 24 | r << 16 | g << 8 | b
  }

  public static rgbToDecimal (r: number, g: number, b: number): number {
    return 255 << 24 | r << 16 | g << 8 | b
  }

  public static hexToRGB (hex: string): string {
    let c: string | string[]
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('')
      if (c.length === 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]]
      c = '0x' + c.join('')
      return `rgba(${this.red(parseInt(c))}, ${this.green(parseInt(c))}, ${this.blue(parseInt(c))}, 1)`
    }
    return 'rgba(255, 255, 255, 1)'
  }

  public static hexaToRGBA (hexa: string): string {
    let c: number | string | string[] = hexa.slice(0, hexa.length - 2)
    if (/^#([A-Fa-f0-9]{4}){1,2}$/.test(hexa)) {
      c = c.substring(1).split('')
      c = '0x' + c.join('')
      return `rgba(${this.red(parseInt(c))}, ${this.green(parseInt(c))}, ${this.blue(parseInt(c))}, ${this.alpha(Number(hexa.slice(-2)))})`
    }
    return 'rgba(255, 255, 255, 1)'
  }
}
