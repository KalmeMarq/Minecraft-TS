import IGuiEventListener from "@mcsrc/interface/IGuiEventListener";
import Minecraft from "../Minecraft";
import InputMappings from "./InputMappings";

export default class KeyboardListener {
  private mc: Minecraft;
  public i = 0
  
  constructor(minecraftIn: Minecraft) {
    this.mc = minecraftIn;
  }

  private onKeyEvent(key: string, action: number, modifiers: {}) {
    const iguieventlistener: IGuiEventListener | null = this.mc.currentScreen;
    if(action != 1) {
      if(action == 0) iguieventlistener?.keyReleased(key, modifiers);
    } else {
      iguieventlistener?.keyPressed(key, modifiers);
    }

    if(key == 'F11') {
     /*  if()
      if(this.mc.gameSettings.fullscreen) {
        if(!document.fullscreenElement) document.documentElement.requestFullscreen();
        this.mc.gameSettings.fullscreen = false;
        this.mc.gameSettings.saveOptions();
      } else {
        if(document.fullscreenElement) document.exitFullscreen();
        this.mc.gameSettings.fullscreen = true;
        this.mc.gameSettings.saveOptions();
      } */
    }
  }

  public setupCallbacks(): void {
    InputMappings.setKeyCallbacks((key: string, action: number, modifiers: any) => {
      this.onKeyEvent(key, action, modifiers);
    })
  }
}