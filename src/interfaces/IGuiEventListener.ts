interface IGuiEventListener {
  mouseMoved(xPos: number, mouseY: number): void;
  mouseClicked(mouseX: number, mouseY: number, button: number): void;
  mouseReleased(mouseX: number, mouseY: number, button: number): void;
  mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): void;
  mouseScrolled(mouseX: number, mouseY: number, delta: number): void;
  keyPressed(key: string, modifiers: any): void;
  keyReleased(key: string, modifiers: any): void
  // charTyped(codePoint: any, modifiers: number): void;
  changeFocus(focus: any): boolean
  isMouseOver(mouseX: number, mouseY: number): void
}

export default IGuiEventListener;