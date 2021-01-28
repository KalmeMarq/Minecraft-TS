export default class MathHelper {
  static floor(mouseX: number) {
    throw new Error("Method not implemented.");
  }
  
  public static clamp(num: number, min: number, max: number): number {
    if (num < min) return min;
    else return num > max ? max : num;
  }
} 