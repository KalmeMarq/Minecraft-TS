export default class MathHelper {  
  public static clamp(num: number, min: number, max: number): number {
    if (num < min) return min;
    else return num > max ? max : num;
  }
} 