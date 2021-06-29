export default class Matrix4 {
  public static identity() {
    return [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]
  }

  public static perspective(fieldOfViewInRadians: number, aspect: number, near: number, far: number) {
    let f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
    let rangeInv = 1.0 / (near - far);
 
    return [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) * rangeInv, -1,
      0, 0, near * far * rangeInv * 2, 0
    ];
  }

  public static orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number, dst?: number[]) {
    let m = dst ?? new Array(16)
    m = m.fill(0)

    m[ 0] = 2 / (right - left);
    m[ 1] = 0;
    m[ 2] = 0;
    m[ 3] = 0;
    m[ 4] = 0;
    m[ 5] = 2 / (top - bottom);
    m[ 6] = 0;
    m[ 7] = 0;
    m[ 8] = 0;
    m[ 9] = 0;
    m[10] = 2 / (near - far);
    m[11] = 0;
    m[12] = (left + right) / (left - right);
    m[13] = (bottom + top) / (bottom - top);
    m[14] = (near + far) / (near - far);
    m[15] = 1;

    return m;
  }

  public static projection(width: number, height: number, depth: number) {
    return [
       2 / width, 0, 0, 0,
       0, -2 / height, 0, 0,
       0, 0, 2 / depth, 0,
      -1, 1, 0, 1,
    ]
  }

  public static multiply(a: number[], b: number[]) {
    let a00 = a[0 * 4 + 0]
    let a01 = a[0 * 4 + 1]
    let a02 = a[0 * 4 + 2]
    let a03 = a[0 * 4 + 3]
    let a10 = a[1 * 4 + 0]
    let a11 = a[1 * 4 + 1]
    let a12 = a[1 * 4 + 2]
    let a13 = a[1 * 4 + 3]
    let a20 = a[2 * 4 + 0]
    let a21 = a[2 * 4 + 1]
    let a22 = a[2 * 4 + 2]
    let a23 = a[2 * 4 + 3]
    let a30 = a[3 * 4 + 0]
    let a31 = a[3 * 4 + 1]
    let a32 = a[3 * 4 + 2]
    let a33 = a[3 * 4 + 3]
    let b00 = b[0 * 4 + 0]
    let b01 = b[0 * 4 + 1]
    let b02 = b[0 * 4 + 2]
    let b03 = b[0 * 4 + 3]
    let b10 = b[1 * 4 + 0]
    let b11 = b[1 * 4 + 1]
    let b12 = b[1 * 4 + 2]
    let b13 = b[1 * 4 + 3]
    let b20 = b[2 * 4 + 0]
    let b21 = b[2 * 4 + 1]
    let b22 = b[2 * 4 + 2]
    let b23 = b[2 * 4 + 3]
    let b30 = b[3 * 4 + 0]
    let b31 = b[3 * 4 + 1]
    let b32 = b[3 * 4 + 2]
    let b33 = b[3 * 4 + 3]
    return [
      b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
      b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
      b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
      b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
      b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
      b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
      b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
      b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
      b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
      b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
      b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
      b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
      b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
      b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
      b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
      b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
    ]
  }

  public static translation(tx: number, ty: number, tz: number) {
    return [
       1,  0,  0,  0,
       0,  1,  0,  0,
       0,  0,  1,  0,
       tx, ty, tz, 1,
    ]
  }

  public static xRotation(angleInRadians: number) {
    let c = Math.cos(angleInRadians)
    let s = Math.sin(angleInRadians)

    return [
      1, 0, 0, 0,
      0, c, s, 0,
      0, -s, c, 0,
      0, 0, 0, 1,
    ]
  }

  public static yRotation(angleInRadians: number) {
    let c = Math.cos(angleInRadians)
    let s = Math.sin(angleInRadians)

    return [
      c, 0, -s, 0,
      0, 1, 0, 0,
      s, 0, c, 0,
      0, 0, 0, 1,
    ]
  }

  public static zRotation(angleInRadians: number) {
    let c = Math.cos(angleInRadians)
    let s = Math.sin(angleInRadians)

    return [
       c, s, 0, 0,
      -s, c, 0, 0,
       0, 0, 1, 0,
       0, 0, 0, 1,
    ]
  }

  public static scaling(sx: number, sy: number, sz: number) {
    return [
      sx, 0,  0,  0,
      0, sy,  0,  0,
      0,  0, sz,  0,
      0,  0,  0,  1,
    ]
  }

  public static translate(m: number[], tx: number, ty: number, tz: number) {
    return Matrix4.multiply(m, Matrix4.translation(tx, ty, tz))
  }

  public static xRotate(m: number[], angleInRadians: number) {
    return Matrix4.multiply(m, Matrix4.xRotation(angleInRadians))
  }

  public static yRotate(m: number[], angleInRadians: number) {
    return Matrix4.multiply(m, Matrix4.yRotation(angleInRadians))
  }

  public static zRotate(m: number[], angleInRadians: number) {
    return Matrix4.multiply(m, Matrix4.zRotation(angleInRadians))
  }

  public static scale(m: number[], sx: number, sy: number, sz: number) {
    return Matrix4.multiply(m, Matrix4.scaling(sx, sy, sz))
  }
}