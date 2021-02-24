import IGuiEventListener from "./IGuiEventListener";

export default interface INestedGuiEventHandler extends IGuiEventListener {
  getEventListeners(): any;
  setDragging(dragging: boolean): void;
  getListener(): IGuiEventListener;
  setListener(listener: IGuiEventListener | null): void;
  setFocusedDefault(eventListener: IGuiEventListener | null): void;
  setListenerDefault(listener: IGuiEventListener | null): void;
}