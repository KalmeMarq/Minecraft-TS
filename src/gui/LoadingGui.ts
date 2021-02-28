import IRenderable from "@mcsrc/interface/IRenderable";
import AbstractGui from "./AbstractGui";

export default abstract class LoadingGui extends AbstractGui implements IRenderable {
  render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
  }
  
  public isPauseScreen(): boolean {
    return true;
  }
}
