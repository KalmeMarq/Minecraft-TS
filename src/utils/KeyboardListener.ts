import IGuiEventListener from "../interfaces/IGuiEventListener";
import Minecraft from "../Minecraft";

export default class KeyboardListener {
  private mc: any;
  
  constructor(minecraftIn: Minecraft) {
    this.mc = minecraftIn;
  }

  private onKeyEvent(key: string, action: number, modifiers: {}) {
    const iguieventlistener: IGuiEventListener = this.mc.currentScreen;
    if (action != 1) {
      if(action == 0) iguieventlistener.keyReleased(key, modifiers);
      else this.mc.currentScreen.keyDown(key, modifiers);
    } else iguieventlistener.keyPressed(key, modifiers);
  }

  /* private onCharEvent(key: string, modifiers: {}): void {
    let iguieventlistener: IGuiEventListener = this.mc.currentScreen;
  } */

  public setupCallbacks() {
    const call_imit = (e: KeyboardEvent, idx: number) => {
      this.onKeyEvent(e.key, idx, {
        altKeyDown: e.getModifierState('Alt'),
        altGrKeyDown: e.getModifierState('AltGraph'),
        capsLockKeyDown: e.getModifierState('CapsLock'),
        controlKeyDown: e.getModifierState('Control'),
        numLockKeyDown: e.getModifierState('NumLock'),
        shiftKeyDown: e.getModifierState('Shift')
      });
    }

    window.addEventListener('keypress', (e: KeyboardEvent) => call_imit(e, 1));
    window.addEventListener('keyup', (e: KeyboardEvent) => call_imit(e, 0));
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if(!(e.key == 'F11' || e.key == 'F12')) e.preventDefault();
      call_imit(e, 2)
    });
  }
}
