export default interface IGuiEventListener {
  mouseMoved(xPos: number, mouseY: number): boolean;
  mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
  mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
  mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
  mouseScrolled(mouseX: number, mouseY: number, delta: number): boolean;
  keyPressed(key: string, modifiers: any): boolean;
  keyReleased(key: string, modifiers: any): boolean;
  changeFocus(focus: any): boolean;
  isMouseOver(mouseX: number, mouseY: number): boolean;
}