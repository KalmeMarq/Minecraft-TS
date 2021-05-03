export default class MathHelper {
  public static clamp (value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
  }

  public static clampTest (value: number, min: number, max: number): number {
    if (value < min) return min
    return value > max ? max : value
  }

  public static lerp (pct: number, start: number, end: number): number {
    return start + pct * (end - start)
  }

  public static ceil (value: number): number {
    const i: number = Math.ceil(value)
    return value > i ? i + 1 : i
  }

  public static normalizeAngle (x: number, y: number): number {
    return x - (y * Math.floor(x / y))
  }

  public static positiveModulo(n: number, m: number): number {
    return Math.abs(Math.floor(n % m));
  }
}
