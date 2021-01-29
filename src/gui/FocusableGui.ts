import IGuiEventListener from "../interfaces/IGuiEventListener.js";
import AbstractGui from "./AbstractGui.js";

export default abstract class FocusableGui extends AbstractGui {
  private listener: IGuiEventListener | null = null;

  public getListener(): IGuiEventListener | null {
    return this.listener;
  }

  public setListener(listener: IGuiEventListener | null): void {
    this.listener = listener;
  }
}