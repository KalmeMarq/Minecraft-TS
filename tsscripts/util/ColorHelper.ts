export default class ColorHelper {
  public static getAlpha(packetColor: number): number {
    return packetColor >>> 24;
  }

  public static  getRed(packedColor: number): number {
    return packedColor >> 16 & 255;
  }

  public static  getGreen(packedColor: number): number {
    return packedColor >> 8 & 255;
  }

  public static  getBlue(packedColor: number): number {
    return packedColor & 255;
  }

  public static packColor(alpha: number, red: number, green: number, blue: number): string {
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  public static getColor(color: number) {
    return this.packColor(1, this.getRed(color), this.getGreen(color), this.getBlue(color));
  }
}