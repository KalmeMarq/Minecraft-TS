
export default interface IGuiEventListener {
  mouseMoved: (mouseX: number, mouseY: number) => void
  mouseClicked: (mouseX: number, mouseY: number, button: number) => boolean
  mouseReleased: (mouseX: number, mouseY: number, button: number) => boolean
  mouseDragged: (mouseX: number, mouseY: number, button: number, dragX: number, dragY: number) => boolean
  mouseScrolled: (mouseX: number, mouseY: number, deltaY: number) => boolean
  keyPressed: (key: string, code: string, action: number) => boolean
  keyReleased: (key: string, code: string, action: number) => boolean
  charTyped: (char: number) => boolean
  changeFocus: (focus: boolean) => boolean
  isMouseOver: (mouseX: number, mouseY: number) => boolean
}
