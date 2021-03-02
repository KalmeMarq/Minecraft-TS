import IGuiEventListener from "@mcsrc/interface/IGuiEventListener";
import { ClipboardHelper } from "@mcsrc/new/util/ClipboardHelper";
import ScreenShotHelper from "@mcsrc/new/util/ScreenShotHelper";
import Minecraft from "../Minecraft";
import InputMappings from "./InputMappings";

export default class KeyboardListener {
  private mc: Minecraft;
  private clipboardHelper: ClipboardHelper = new ClipboardHelper();
  
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

    if(key == 'F11' && action == 1) {
      this.mc.gameSettings.fullscreen = !this.mc.gameSettings.fullscreen;

      if(this.mc.gameSettings.fullscreen) {
        if(document.fullscreenElement) document.documentElement.requestFullscreen();
      } else {
        if(document.fullscreenElement) document.exitFullscreen();
      }

      this.mc.gameSettings.saveOptions();
    }

    if(key == 'F2' && action == 0) {
      ScreenShotHelper.saveScreenshot(this.mc.getMainCanvas().getCanvas())
    }
  }

  public getClipboardString(): Promise<string> {
    return this.clipboardHelper.getClipboardString();
  }

  public setClipboardString(string: string): void {
    this.clipboardHelper.setClipboardString(string);
  }

  public setupCallbacks(): void {
    InputMappings.setKeyCallbacks((key: string, action: number, modifiers: any) => {
      this.onKeyEvent(key, action, modifiers);
    })
  }
}