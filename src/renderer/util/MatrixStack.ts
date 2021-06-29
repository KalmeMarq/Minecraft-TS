import Matrix4 from "./math/Matrix4"

export default class MatrixStack {
  public stack: number[][] = []

  public constructor() {
    this.pop()
  }

  public push(): void {
    this.stack.push(this.getCurrentMatrix())
  }

  public pop(): void {
    this.stack.pop()

    if(this.stack.length < 1) {
      this.stack[0] = Matrix4.identity()
    }
  }

  public getCurrentMatrix() {
    return this.stack.slice(this.stack.length - 1, this.stack.length)[0]
  }
   
  public setCurrentMatrix(m: number[]) {
    return this.stack[this.stack.length - 1] = m
  }

  public translate(x: number, y: number, z = 0) {
    let m = this.getCurrentMatrix()
    this.setCurrentMatrix(Matrix4.translate(m, x, y, z))
  }
   
  public rotateZ(angleInRadians: number) {
    let m = this.getCurrentMatrix()
    this.setCurrentMatrix(Matrix4.zRotate(m, angleInRadians * Math.PI / 180))
  }

  public rotate(x: number, y: number, z: number = 0) {
    let m = this.getCurrentMatrix()
    Matrix4.xRotate(m, x * Math.PI / 180)
    Matrix4.yRotate(m, y * Math.PI / 180)
    Matrix4.zRotate(m, z * Math.PI / 180)
    this.setCurrentMatrix(m)
  }

  public scale(x: number, y: number, z = 1) {
    let m = this.getCurrentMatrix()
    this.setCurrentMatrix(Matrix4.scale(m, x, y, z))
  }
}