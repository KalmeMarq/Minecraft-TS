import { gl, Main } from "..";
import AbstractGui from "../gui/AbstractGui";
import MatrixStack from "../util/MatrixStack";
import ResourceLocation from "../util/ResourceLocation";

export default class RenderSkyboxCube extends AbstractGui {
  private readonly images: ResourceLocation[] = new Array(6)

  public constructor(location: ResourceLocation) {
    super()
    for(let i = 0; i < 6; ++i) {
      this.images[i] = new ResourceLocation(location.getPath() + '_' + i + '.png')
    }
  }

  public render(matrixStack: MatrixStack, p_217616_2_: number, p_217616_3_: number, fadeAlpha: number): void {
    matrixStack.push()
    // matrixStack.setCurrentMatrix((Matrix4.perspective(1.0, gl.canvas.width / gl.canvas.height, 0.05, 10.0)))
    matrixStack.rotate(180, 1, 0)

    gl.disable(gl.CULL_FACE)
    for(let j = 0; j < 4; ++j) {
      matrixStack.push()
      let f = ((j % 2) / 2.0 - 0.5) / 256.0
      let f1 = ((j / 2) / 2.0 - 0.5) / 256.0
      matrixStack.translate(f, f1, 0.0)
      matrixStack.rotate(p_217616_2_, 1.0, 0.0)
      matrixStack.rotate(p_217616_3_, 0.0, 1.0)

      for(let k = 0; k < 6; ++k) {
        Main.bind(this.images[k])

        this.blit(matrixStack, 0, 0, 256, 256)
      }

      matrixStack.pop()
    }
    matrixStack.pop()
    gl.enable(gl.CULL_FACE)
  }
}