import IGuiEventListener from '../../util/interfaces/IGuiEventListener'
import INestedGuiEventHandler from '../../util/interfaces/INestedGuiEventHandler'

export default abstract class NestedGuiEventHandler implements INestedGuiEventHandler {
  abstract isDragging (): boolean
  abstract getChildren (): IGuiEventListener[]

  public getChildAt (mouseX: number, mouseY: number): IGuiEventListener | null {
    for (const listener of this.getChildren()) {
      if (listener.isMouseOver(mouseX, mouseY)) {
        return listener
      }
    }
    return null
  }

  public mouseMoved (): boolean {
    return false
  }

  public mouseClicked (mouseX: number, mouseY: number, button: number): boolean {
    for (const listener of this.getChildren()) {
      if (listener.mouseClicked(mouseX, mouseY, button)) {
        this.setFocused(listener)
        if (button === 0) this.setDragging(true)
        return true
      }
    }
    return false
  }

  public mouseReleased (mouseX: number, mouseY: number, button: number): boolean {
    this.setDragging(false)
    const child = this.getChildAt(mouseX, mouseY)
    if (child !== null) {
      return child.mouseReleased(mouseX, mouseY, button)
    }
    return false
  }

  public mouseDragged (mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean {
    const focused = this.getFocused()
    if (focused !== null && this.isDragging() && button === 0) {
      focused.mouseDragged(mouseX, mouseY, button, dragX, dragY)
    }
    return false
  }

  public mouseScrolled (mouseX: number, mouseY: number, deltaY: number): boolean {
    const child = this.getChildAt(mouseX, mouseY)
    if (child !== null) {
      return child.mouseScrolled(mouseX, mouseY, deltaY)
    }
    return false
  }

  public isMouseOver (mouseX: number, mouseY: number): boolean {
    return false
  }

  public keyPressed (key: string, code: string, action: number): boolean {
    const focused = this.getFocused()
    return focused?.keyPressed(key, code, action) ?? false
  }

  public keyReleased (key: string, code: string, action: number): boolean {
    const focused = this.getFocused()
    return focused?.keyReleased(key, code, action) ?? false
  }

  public charTyped (char: number): boolean {
    const focused = this.getFocused()
    return focused?.charTyped(char) ?? false
  }

  abstract getFocused (): IGuiEventListener | null
  abstract setFocused (listener: IGuiEventListener | null): void
  abstract setDragging (drag: boolean): void

  public setInitialFocus (listener: IGuiEventListener | null): void {
    this.setFocused(listener)
    listener?.changeFocus(true)
  }

  public changeFocus (focus: boolean): boolean {
    return false
  }
}
