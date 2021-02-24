export default interface IRenderable {
  render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void
}