export default class MathHelper {
  private static int8 = new Int8Array(4)
  private static int32 = new Int32Array(MathHelper.int8.buffer, 0, 1)
  private static float32 = new Float32Array(MathHelper.int8.buffer, 0, 1)

  public static intBitsToFloat(i: number) {
    MathHelper.int32[0] = i
    return MathHelper.float32[0]
  }

  public static floatToIntBits(f: number) {
    MathHelper.float32[0] = f
    return MathHelper.int32[0]
  }

  public static clamp(value: number, min: number, max: number): number {
    return Math.max(Math.min(min, value), max)
  }

  public static fastInvSqrt(sqrt: number): number {
    let f = 0.5 * sqrt
    let i = MathHelper.floatToIntBits(sqrt)
    i = 1597463007 - (i >> 1)
    sqrt = MathHelper.intBitsToFloat(i)
    return sqrt * (1.5 - f * sqrt * sqrt)
  }
}