export default class ColorHelper {
  public static PackedColor = class PackedColor {
    public static getAlpha(packetColor: number): number {
      return packetColor >>> 24;
    }
  
    public static getRed(packedColor: number): number {
      return packedColor >> 16 & 255;
    }
  
    public static getGreen(packedColor: number): number {
      return packedColor >> 8 & 255;
    }
  
    public static getBlue(packedColor: number): number {
      return packedColor & 255;
    }
  
    public static packColor(alpha: number, red: number, green: number, blue: number): number {
      return alpha << 24 | red << 16 | green << 8 | blue;
    }
  }

  public static UnpackedColor = class UnpackedColor {
    public static UnpackToRGBAColor(packedColor: number): string {
      return `rgba(${packedColor >> 16 & 255}, ${packedColor >> 8 & 255}, ${packedColor & 255}, ${((packedColor >>> 24) / 255)})`
    }

    public static UnpackToHEXAColor(packedColor: number): string {
      let rgba = ColorHelper.UnpackedColor.UnpackToRGBAColor(packedColor);
      return '#' + rgba.substr(5).split(")")[0].split(rgba.indexOf(",") > -1 ? "," : " ").map(x => x = (+x).toString(16).slice(-2)).join('');
    }
  }
}
