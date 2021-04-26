import IGuiEventListener from '../interfaces/IGuiEventListener'
import NestedGuiEventHandler from './NestedGuiEventHandler'

export default abstract class FocusableGui extends NestedGuiEventHandler {
  private focused: IGuiEventListener | null = null
  private dragging = false

  public isDragging (): boolean {
    return this.dragging
  }

  public setDragging (drag: boolean): void {
    this.dragging = drag
  }

  public getFocused (): IGuiEventListener | null {
    return this.focused
  }

  public setFocused (listener: IGuiEventListener | null): void {
    this.focused = listener
  }
}
