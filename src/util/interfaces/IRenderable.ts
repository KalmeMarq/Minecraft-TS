
export default interface IRenderable {
  render: (mouseX: number, mouseY: number, partialTicks: number) => void
}
