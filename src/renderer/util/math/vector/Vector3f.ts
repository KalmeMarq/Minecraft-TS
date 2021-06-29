import MathHelper from "../MathHelper"

export default class Vector3f {
  public static XN: Vector3f = new Vector3f(-1.0, 0.0, 0.0)
  public static XP: Vector3f = new Vector3f(1.0, 0.0, 0.0)
  public static YN: Vector3f = new Vector3f(0.0, -1.0, 0.0)
  public static YP: Vector3f = new Vector3f(0.0, 1.0, 0.0)
  public static ZN: Vector3f = new Vector3f(0.0, 0.0, -1.0)
  public static ZP: Vector3f = new Vector3f(0.0, 0.0, 1.0)
  private _x = 0
  private _y = 0
  private _z = 0

  public constructor(x?: number, y?: number, z?: number) {
    this._x = x ?? 0
    this._y = y ?? 0
    this._z = z ?? 0
  }
  public x(): number {
    return this._x
  }

  public y(): number {
    return this._y
  }

  public z(): number {
    return this._z
  }

  public mul(valueOrX: number, y?: number, z?: number): void {
    if(y && z) {
      this._x *= valueOrX
      this._y *= y
      this._z *= z
    } else {
      this._x *= valueOrX
      this._y *= valueOrX
      this._z *= valueOrX
    }
  }

  public clamp(min: number, max: number): void {
    this._x = MathHelper.clamp(this._x, min, max)
    this._y = MathHelper.clamp(this._y, min, max)
    this._z = MathHelper.clamp(this._z, min, max)
  }

  public set(p_195905_1_: number, p_195905_2_: number, p_195905_3_: number): void {
    this._x = p_195905_1_
    this._y = p_195905_2_
    this._z = p_195905_3_
  }

  public add(p_195904_1_: number | Vector3f, p_195904_2_?: number, p_195904_3_?: number): void {
    if(p_195904_1_ instanceof Vector3f) {
      this._x += p_195904_1_.x()
      this._y += p_195904_1_.y()
      this._z += p_195904_1_.z()
    } else if(p_195904_3_ && p_195904_2_ && p_195904_3_) {
      this._x += p_195904_1_
      this._y += p_195904_2_
      this._z += p_195904_3_
    }
  }

  public sub(p_195897_1_: Vector3f): void {
    this._x -= p_195897_1_.x()
    this._y -= p_195897_1_.y()
    this._z -= p_195897_1_.z()
  }

  public dot(p_195903_1_: Vector3f): number {
    return this._x * p_195903_1_.x() + this._y * p_195903_1_.y() + this._z * p_195903_1_.z()
  }

  public normalize(): boolean {
    let f = this._x * this._x + this._y * this._y + this._z * this._z
    if (f < 1.0E-5) {
        return false
    } else {
        let f1 = MathHelper.fastInvSqrt(f)
        this._x *= f1
        this._y *= f1
        this._z *= f1
        return true
    }
  }

  public cross(p_195896_1_: Vector3f): void {
    let f = this._x
    let f1 = this._y
    let f2 = this._z
    let f3 = p_195896_1_.x()
    let f4 = p_195896_1_.y()
    let f5 = p_195896_1_.z()
    this._x = f1 * f5 - f2 * f4
    this._y = f2 * f3 - f * f5
    this._z = f * f4 - f1 * f3
  }

/*   public void transform(Matrix3f p_229188_1_) {
    let f = this._x
    let f1 = this._y
    let f2 = this._z
    this._x = p_229188_1_.m00 * f + p_229188_1_.m01 * f1 + p_229188_1_.m02 * f2
    this._y = p_229188_1_.m10 * f + p_229188_1_.m11 * f1 + p_229188_1_.m12 * f2
    this._z = p_229188_1_.m20 * f + p_229188_1_.m21 * f1 + p_229188_1_.m22 * f2
  } */

  public lerp(p_229190_1_: Vector3f, p_229190_2_: number): void {
    let f = 1.0 - p_229190_2_
    this._x = this._x * f + p_229190_1_.x() * p_229190_2_
    this._y = this._y * f + p_229190_1_.y() * p_229190_2_
    this._z = this._z * f + p_229190_1_.z() * p_229190_2_
  }

  public copy(): Vector3f {
    return new Vector3f(this._x, this._y, this._z)
  }
}