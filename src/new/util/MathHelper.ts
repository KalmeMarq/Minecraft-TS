export default class MathHelper {  
  public static clamp(num: number, min: number, max: number): number {
    return num < min ? min : num > max ? max : num
  }

  public static lerp(pct: number, start: number, end: number): number {
    return start + pct * (end - start);
  }

  public static ceil(value: number): number {
    let i = Math.ceil(value);
    return value > i ? i + 1 : i;
  }

  public static normalizeAngle(x: number, y: number): number {
    return x - (y * Math.floor(x / y));
  }
} 