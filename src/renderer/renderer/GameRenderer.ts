import { gl, Main } from "..";
import Matrix4 from "../util/math/Matrix4";
import MatrixStack from "../util/MatrixStack";

let t = 0
let d = 0

export default class GameRenderer {
  public constructor() {
  }

  public render(): void {
    let matrixstack = new MatrixStack()
    
    gl.clearColor(0.2, 0.2, 0.2, 1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    Main.ortMt = Matrix4.orthographic(0, gl.canvas.width / 3, gl.canvas.height / 3, 0, 1000, 3000)
    Main.ortMt = Matrix4.translate(Main.ortMt, 0.0, 0.0, -2000);

    d = Date.now() - t * 0.01
    t = Date.now()

    if(Main.screen !== null) {
      Main.screen.render(matrixstack, Main.xPos / 3, Main.yPos / 3, d)
    }
  }
}