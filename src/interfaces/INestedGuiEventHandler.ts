import IGuiEventListener from './IGuiEventListener'

export default interface INestedGuiEventHandler extends IGuiEventListener {
  isDragging: () => boolean
  setDragging: (drag: boolean) => void
  getFocused: () => IGuiEventListener | null
  setFocused: (listener: IGuiEventListener | null) => void
  setInitialFocus: (listener: IGuiEventListener | null) => void
  getChildren: () => IGuiEventListener[]
  getChildAt: (mouseX: number, mouseY: number) => IGuiEventListener | null
}
