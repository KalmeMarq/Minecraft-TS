import Vector3f from "./Vector3f"

export default class Matrix4f {
  protected m00: number = 1
  protected m01: number = 0
  protected m02: number = 0
  protected m03: number = 0
  protected m10: number = 0
  protected m11: number = 1
  protected m12: number = 0
  protected m13: number = 0
  protected m20: number = 0
  protected m21: number = 0
  protected m22: number = 1
  protected m23: number = 0
  protected m30: number = 0
  protected m31: number = 0
  protected m32: number = 0
  protected m33: number = 1

  public constructor(matrix?: Matrix4f) {
    if(matrix) {
      this.m00 = matrix.m00
      this.m01 = matrix.m01
      this.m02 = matrix.m02
      this.m03 = matrix.m03
      this.m10 = matrix.m10
      this.m11 = matrix.m11
      this.m12 = matrix.m12
      this.m13 = matrix.m13
      this.m20 = matrix.m20
      this.m21 = matrix.m21
      this.m22 = matrix.m22
      this.m23 = matrix.m23
      this.m30 = matrix.m30
      this.m31 = matrix.m31
      this.m32 = matrix.m32
      this.m33 = matrix.m33
    }
  }

  public setIdentity(): void {
     this.m00 = 1.0
     this.m01 = 0.0
     this.m02 = 0.0
     this.m03 = 0.0
     this.m10 = 0.0
     this.m11 = 1.0
     this.m12 = 0.0
     this.m13 = 0.0
     this.m20 = 0.0
     this.m21 = 0.0
     this.m22 = 1.0
     this.m23 = 0.0
     this.m30 = 0.0
     this.m31 = 0.0
     this.m32 = 0.0
     this.m33 = 1.0
  }

  public adjugateAndDet(): number {
    let f = this.m00 * this.m11 - this.m01 * this.m10
    let f1 = this.m00 * this.m12 - this.m02 * this.m10
    let f2 = this.m00 * this.m13 - this.m03 * this.m10
    let f3 = this.m01 * this.m12 - this.m02 * this.m11
    let f4 = this.m01 * this.m13 - this.m03 * this.m11
    let f5 = this.m02 * this.m13 - this.m03 * this.m12
    let f6 = this.m20 * this.m31 - this.m21 * this.m30
    let f7 = this.m20 * this.m32 - this.m22 * this.m30
    let f8 = this.m20 * this.m33 - this.m23 * this.m30
    let f9 = this.m21 * this.m32 - this.m22 * this.m31
    let f10 = this.m21 * this.m33 - this.m23 * this.m31
    let f11 = this.m22 * this.m33 - this.m23 * this.m32
    let f12 = this.m11 * f11 - this.m12 * f10 + this.m13 * f9
    let f13 = -this.m10 * f11 + this.m12 * f8 - this.m13 * f7
    let f14 = this.m10 * f10 - this.m11 * f8 + this.m13 * f6
    let f15 = -this.m10 * f9 + this.m11 * f7 - this.m12 * f6
    let f16 = -this.m01 * f11 + this.m02 * f10 - this.m03 * f9
    let f17 = this.m00 * f11 - this.m02 * f8 + this.m03 * f7
    let f18 = -this.m00 * f10 + this.m01 * f8 - this.m03 * f6
    let f19 = this.m00 * f9 - this.m01 * f7 + this.m02 * f6
    let f20 = this.m31 * f5 - this.m32 * f4 + this.m33 * f3
    let f21 = -this.m30 * f5 + this.m32 * f2 - this.m33 * f1
    let f22 = this.m30 * f4 - this.m31 * f2 + this.m33 * f
    let f23 = -this.m30 * f3 + this.m31 * f1 - this.m32 * f
    let f24 = -this.m21 * f5 + this.m22 * f4 - this.m23 * f3
    let f25 = this.m20 * f5 - this.m22 * f2 + this.m23 * f1
    let f26 = -this.m20 * f4 + this.m21 * f2 - this.m23 * f
    let f27 = this.m20 * f3 - this.m21 * f1 + this.m22 * f
    this.m00 = f12
    this.m10 = f13
    this.m20 = f14
    this.m30 = f15
    this.m01 = f16
    this.m11 = f17
    this.m21 = f18
    this.m31 = f19
    this.m02 = f20
    this.m12 = f21
    this.m22 = f22
    this.m32 = f23
    this.m03 = f24
    this.m13 = f25
    this.m23 = f26
    this.m33 = f27
    return f * f11 - f1 * f10 + f2 * f9 + f3 * f8 - f4 * f7 + f5 * f6
  }

  public transpose(): void {
    let f = this.m10
    this.m10 = this.m01
    this.m01 = f
    f = this.m20
    this.m20 = this.m02
    this.m02 = f
    f = this.m21
    this.m21 = this.m12
    this.m12 = f
    f = this.m30
    this.m30 = this.m03
    this.m03 = f
    f = this.m31
    this.m31 = this.m13
    this.m13 = f
    f = this.m32
    this.m32 = this.m23
    this.m23 = f
  }

  public invert(): boolean {
    let f = this.adjugateAndDet()
    if(Math.abs(f) > 1.0E-6) {
      this.multiply(f)
      return true
    } else {
      return false
    }
  }

  public multiply(matrixOrNumber: Matrix4f | number): void {
    if(matrixOrNumber instanceof Matrix4f) {
      let f = this.m00 * matrixOrNumber.m00 + this.m01 * matrixOrNumber.m10 + this.m02 * matrixOrNumber.m20 + this.m03 * matrixOrNumber.m30
      let f1 = this.m00 * matrixOrNumber.m01 + this.m01 * matrixOrNumber.m11 + this.m02 * matrixOrNumber.m21 + this.m03 * matrixOrNumber.m31
      let f2 = this.m00 * matrixOrNumber.m02 + this.m01 * matrixOrNumber.m12 + this.m02 * matrixOrNumber.m22 + this.m03 * matrixOrNumber.m32
      let f3 = this.m00 * matrixOrNumber.m03 + this.m01 * matrixOrNumber.m13 + this.m02 * matrixOrNumber.m23 + this.m03 * matrixOrNumber.m33
      let f4 = this.m10 * matrixOrNumber.m00 + this.m11 * matrixOrNumber.m10 + this.m12 * matrixOrNumber.m20 + this.m13 * matrixOrNumber.m30
      let f5 = this.m10 * matrixOrNumber.m01 + this.m11 * matrixOrNumber.m11 + this.m12 * matrixOrNumber.m21 + this.m13 * matrixOrNumber.m31
      let f6 = this.m10 * matrixOrNumber.m02 + this.m11 * matrixOrNumber.m12 + this.m12 * matrixOrNumber.m22 + this.m13 * matrixOrNumber.m32
      let f7 = this.m10 * matrixOrNumber.m03 + this.m11 * matrixOrNumber.m13 + this.m12 * matrixOrNumber.m23 + this.m13 * matrixOrNumber.m33
      let f8 = this.m20 * matrixOrNumber.m00 + this.m21 * matrixOrNumber.m10 + this.m22 * matrixOrNumber.m20 + this.m23 * matrixOrNumber.m30
      let f9 = this.m20 * matrixOrNumber.m01 + this.m21 * matrixOrNumber.m11 + this.m22 * matrixOrNumber.m21 + this.m23 * matrixOrNumber.m31
      let f10 = this.m20 * matrixOrNumber.m02 + this.m21 * matrixOrNumber.m12 + this.m22 * matrixOrNumber.m22 + this.m23 * matrixOrNumber.m32
      let f11 = this.m20 * matrixOrNumber.m03 + this.m21 * matrixOrNumber.m13 + this.m22 * matrixOrNumber.m23 + this.m23 * matrixOrNumber.m33
      let f12 = this.m30 * matrixOrNumber.m00 + this.m31 * matrixOrNumber.m10 + this.m32 * matrixOrNumber.m20 + this.m33 * matrixOrNumber.m30
      let f13 = this.m30 * matrixOrNumber.m01 + this.m31 * matrixOrNumber.m11 + this.m32 * matrixOrNumber.m21 + this.m33 * matrixOrNumber.m31
      let f14 = this.m30 * matrixOrNumber.m02 + this.m31 * matrixOrNumber.m12 + this.m32 * matrixOrNumber.m22 + this.m33 * matrixOrNumber.m32
      let f15 = this.m30 * matrixOrNumber.m03 + this.m31 * matrixOrNumber.m13 + this.m32 * matrixOrNumber.m23 + this.m33 * matrixOrNumber.m33
      this.m00 = f
      this.m01 = f1
      this.m02 = f2
      this.m03 = f3
      this.m10 = f4
      this.m11 = f5
      this.m12 = f6
      this.m13 = f7
      this.m20 = f8
      this.m21 = f9
      this.m22 = f10
      this.m23 = f11
      this.m30 = f12
      this.m31 = f13
      this.m32 = f14
      this.m33 = f15
    } else {
      this.m00 *= matrixOrNumber
      this.m01 *= matrixOrNumber
      this.m02 *= matrixOrNumber
      this.m03 *= matrixOrNumber
      this.m10 *= matrixOrNumber
      this.m11 *= matrixOrNumber
      this.m12 *= matrixOrNumber
      this.m13 *= matrixOrNumber
      this.m20 *= matrixOrNumber
      this.m21 *= matrixOrNumber
      this.m22 *= matrixOrNumber
      this.m23 *= matrixOrNumber
      this.m30 *= matrixOrNumber
      this.m31 *= matrixOrNumber
      this.m32 *= matrixOrNumber
      this.m33 *= matrixOrNumber
    }
  }

  public static perspective(p_195876_0_: number, p_195876_2_: number, p_195876_3_: number, p_195876_4_: number): Matrix4f {
    let f = (1.0 / Math.tan(p_195876_0_ * (Math.PI / 180) / 2.0))
    let matrix4f = new Matrix4f()
    matrix4f.m00 = f / p_195876_2_
    matrix4f.m11 = f
    matrix4f.m22 = (p_195876_4_ + p_195876_3_) / (p_195876_3_ - p_195876_4_)
    matrix4f.m32 = -1.0
    matrix4f.m23 = 2.0 * p_195876_4_ * p_195876_3_ / (p_195876_3_ - p_195876_4_)
    return matrix4f
  }

  public static orthographic(p_195877_0_: number, p_195877_1_: number, p_195877_2_: number, p_195877_3_: number) {
    let matrix4f = new Matrix4f()
    matrix4f.m00 = 2.0 / p_195877_0_
    matrix4f.m11 = 2.0 / p_195877_1_
    let f = p_195877_3_ - p_195877_2_
    matrix4f.m22 = -2.0 / f
    matrix4f.m33 = 1.0
    matrix4f.m03 = -1.0
    matrix4f.m13 = -1.0
    matrix4f.m23 = -(p_195877_3_ + p_195877_2_) / f
    return matrix4f
  }

  public translate(vector: Vector3f): void {
    this.m03 += vector.x()
    this.m13 += vector.y()
    this.m23 += vector.z()
  }

  public copy(): Matrix4f {
    return new Matrix4f(this)
  }

  public toArray(): number[] {
    return [
      this.m00, this.m01, this.m02, this.m03,
      this.m10, this.m11, this.m12, this.m13,
      this.m20, this.m21, this.m22, this.m23,
      this.m30, this.m31, this.m32, this.m33
    ]
  }

  public static createScaleMatrix(p_226593_0_: number, p_226593_1_: number, p_226593_2_: number): Matrix4f {
    let matrix4f = new Matrix4f()
    matrix4f.m00 = p_226593_0_
    matrix4f.m11 = p_226593_1_
    matrix4f.m22 = p_226593_2_
    matrix4f.m33 = 1.0
    return matrix4f
  }

  public static createTranslateMatrix(p_226599_0_: number, p_226599_1_: number, p_226599_2_: number): Matrix4f {
    let matrix4f = new Matrix4f()
    matrix4f.m00 = 1.0
    matrix4f.m11 = 1.0
    matrix4f.m22 = 1.0
    matrix4f.m33 = 1.0
    matrix4f.m03 = p_226599_0_
    matrix4f.m13 = p_226599_1_
    matrix4f.m23 = p_226599_2_
    return matrix4f
  }
}