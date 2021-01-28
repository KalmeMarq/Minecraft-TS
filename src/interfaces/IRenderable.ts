interface IRenderable {
  renderScreen(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void;
}

export default IRenderable;