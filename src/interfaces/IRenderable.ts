export default interface IRenderable {
  renderObject(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void;
}