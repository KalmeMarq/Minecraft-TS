import { throws } from "assert";
import IGuiEventListener from "../interface/IGuiEventListener";
import INestedGuiEventHandler from "../interface/INestedGuiEventHandler";
import AbstractGui from "./AbstractGui";
import Widget from "./widgets/Widget";

export default abstract class FocusableGui extends AbstractGui implements INestedGuiEventHandler {
  private listener: IGuiEventListener | null = null;
  public isDragging: boolean = false;

  public getIsDragging(): boolean {
    return this.isDragging
  }

  public setDragging(dragging: boolean): void {
    this.isDragging = dragging
  }

  public getListener (): IGuiEventListener {
    return this.listener!
  }

  public setListener(listener: IGuiEventListener | null) {
    this.listener = listener
  }

  public getEventListeners(): any {
  }

  public setFocusedDefault(eventListener: IGuiEventListener | null): void {
    this.setListener(eventListener)
    eventListener !== null && eventListener.changeFocus(true)
  }

  public setListenerDefault(eventListener: IGuiEventListener | null): void {
    this.setListener(eventListener)
  }

  public mouseMoved(xPos: number, mouseY: number): boolean {
    return false
  }

  public mouseClicked(mouseX: number, mouseY: number, button: number): boolean {
    for(let i = 0; i < this.getEventListeners().length; i++) {
      const iguieventlistener: IGuiEventListener = this.getEventListeners()[i];

      if(iguieventlistener.mouseClicked(mouseX, mouseY, button)) {
        this.setListener(iguieventlistener);
        if(button == 0) this.setDragging(true);
        return true;
      } else {
        this.setListener(null)
        for(let listeners of this.getEventListeners()) {
          listeners.isFocused() && listeners.changeFocus(false)
        }
      }
    }

    return false;
  }

  public mouseReleased(mouseX: number, mouseY: number, button: number): boolean {
    this.setDragging(false)
    
    for(let i = 0; i < this.getEventListeners().length; i++) {
      const iguieventlistener: IGuiEventListener = this.getEventListeners()[i];

      if(iguieventlistener.isMouseOver(mouseX, mouseY)) {
        iguieventlistener.mouseReleased(mouseX, mouseY, button);
        return true;
      }
    }

    return false;
  }

  public mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean {
    return this.getListener() != null && this.getIsDragging() && button == 0 ? this.getListener().mouseDragged(mouseX, mouseY, button, dragX, dragY) : false
  }

  public mouseScrolled(mouseX: number, mouseY: number, delta: number): boolean {
    this.getListener() && this.getListener().mouseScrolled(mouseX, mouseY, delta)
    return false;
  }
  
  public keyPressed(key: string, modifiers: any): boolean {
    return this.getListener() != null && this.getListener().keyPressed(key, modifiers)
  }

  public keyReleased(key: string, modifiers: any): boolean {
    return this.getListener() != null && this.getListener().keyReleased(key, modifiers)
  }

  public changeFocus(focus: any): boolean {
    let iguieventlistener: IGuiEventListener = this.getListener()
    let flag = iguieventlistener != null

    if (flag && iguieventlistener.changeFocus(focus)) {
      return true;
   } else {
      let list: IGuiEventListener[] = this.getEventListeners();
      let j = list.indexOf(iguieventlistener);
      let i;
      if(flag && j >= 0) {
        i = j + (focus ? 1 : 0);
      } else if(focus) {
        i = 0;
      } else {
        i = list.length;
      }

      if(i >= list.length) {
        i = 0;
      }

      let iguieventlistener1 = list[i];
      if(iguieventlistener1.changeFocus(focus)) {
        this.setListener(iguieventlistener1);
        return true;
      }

      this.setListener(null)
      return false
    }
  }

  public isMouseOver(mouseX: number, mouseY: number): boolean {
    return false
  }
}
