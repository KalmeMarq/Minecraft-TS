import IRenderable from "../../util/interfaces/IRenderable";

export default abstract class LoadingGui implements IRenderable {
  abstract render: (mouseX: number, mouseY: number, partialTicks: number) => void;
  public isPauseScreen(): boolean {
     return true;
  }
}