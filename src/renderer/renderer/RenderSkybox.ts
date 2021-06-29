import MatrixStack from "../util/MatrixStack";
import RenderSkyboxCube from "./RenderSkyboxCube";

export default class RenderSkybox {
  private readonly cubeMap: RenderSkyboxCube
  private time: number = 0

  public constructor(renderCube: RenderSkyboxCube) {
    this.cubeMap = renderCube
  }

  public render(matrixStack: MatrixStack, deltaTime: number, fadeAlpha: number): void {
    this.time += deltaTime;
    this.cubeMap.render(matrixStack, Math.sin(this.time * 0.001) * 5.0 + 25.0, -this.time * 0.1, fadeAlpha)
  }
}