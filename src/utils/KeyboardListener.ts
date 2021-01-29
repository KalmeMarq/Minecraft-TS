import IGuiEventListener from "../interfaces/IGuiEventListener.js";
import Minecraft from "../Minecraft.js";

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

  public setupCallbacks() {
    window.addEventListener('keypress', (e: KeyboardEvent) => {
      this.onKeyEvent(e.key, 1, {
        altKeyDown: e.getModifierState('Alt'),
        altGrKeyDown: e.getModifierState('AltGraph'),
        capsLockKeyDown: e.getModifierState('CapsLock'),
        controlKeyDown: e.getModifierState('Control'),
        numLockKeyDown: e.getModifierState('NumLock'),
        shiftKeyDown: e.getModifierState('Shift')
      });
    });

    window.addEventListener('keyup', (e: KeyboardEvent) => {
      this.onKeyEvent(e.key, 0, {
        altKeyDown: e.getModifierState('Alt'),
        altGrKeyDown: e.getModifierState('AltGraph'),
        capsLockKeyDown: e.getModifierState('CapsLock'),
        controlKeyDown: e.getModifierState('Control'),
        numLockKeyDown: e.getModifierState('NumLock'),
        shiftKeyDown: e.getModifierState('Shift')
      });
    });

    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if(!(e.key == 'F11' || e.key == 'F12')) e.preventDefault();
      this.onKeyEvent(e.key, 2,  {
        altKeyDown: e.getModifierState('Alt'),
        altGrKeyDown: e.getModifierState('AltGraph'),
        capsLockKeyDown: e.getModifierState('CapsLock'),
        controlKeyDown: e.getModifierState('CapsLoControlck'),
        numLockKeyDown: e.getModifierState('NumLock'),
        shiftKeyDown: e.getModifierState('Shift')
      });
    })
  }
}
