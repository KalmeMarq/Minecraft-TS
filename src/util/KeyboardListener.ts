import Minecraft from '../client/Minecraft';
import ClipboardHelper from './ClipboardHelper'
import InputMappings from './InputMappings'
// import ScreenShotHelper from './ScreenShotHelper'

export default class KeyboardListener {
  private readonly mc: Minecraft;
  private readonly clipboardHelper: ClipboardHelper = new ClipboardHelper();

  public constructor(mcIn: Minecraft) {
    this.mc = mcIn
  }

  public setup (): void {
    InputMappings.setupKeyCallbacks((key, code, action) => {
      this.handleKeyEvent(key, code, action)
    }, (char) => {
      this.handleKeyTypedEvent(char)
    })
  }

  public handleKeyEvent(key: string, code: string, action: number): void {
    console.log(action === 1, action === 0, action === 2);

    if (!this.mc.overlay) {
      if (this.mc.screen) {
        if (action !== 1 && action !== 2) {
          if (action === 0) this.mc.screen.keyReleased(key, code, action)
        } else {
          this.mc.screen.keyPressed(key, code, action)
        }
      }
    }

    if (this.mc.screen === null) {
      if (action === 0) {
        if (code === 'F3') {
          this.mc.options.showDebugInfo = !this.mc.options.showDebugInfo
        }
      } else {
        let flag1 = false
/* 
        if (this.mc.screen === null) {
          if (code === 'Escape') {
            const flag2 = InputMappings.isKeyDown('F3')
            this.mc.pauseGame(flag2)
          }

          flag1 = InputMappings.isKeyDown('F1')
          if (code === 'F1') {
            this.mc.options.hideGUI = !this.mc.options.hideGUI
          }
        } */
      }
    } else if (this.mc.screen !== null) {
      /* if (this.mc.screen instanceof IngameMenuScreen) {
        if (action === 0 && code === 'Escape') {
          this.mc.setScreen(null)
          this.mc.worldRenderer.controls.lock()
        }
      } */
    }

    /* if (key === 'F2' && action === 0) {
      ScreenShotHelper.saveScreenshot(this.mc.getMCCanvas().getCanvas())
    } */
  }

  public handleKeyTypedEvent(char: number): void {
    if (!this.mc.overlay) {
      if (this.mc.screen) {
        this.mc.screen.charTyped(char)
      }
    }
  }

  public async getClipboardString (): Promise<string> {
    return await this.clipboardHelper.getClipboardString()
  }

  public setClipboardString (string: string): void {
    this.clipboardHelper.setClipboardString(string)
  }
}
