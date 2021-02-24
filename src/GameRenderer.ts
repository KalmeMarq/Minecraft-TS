import Minecraft from '@km.mcts/Minecraft';
import Util from '@km.mcts/util/Util';
import MainMenuScreen from './gui/screen/MainMenuScreen';

export default class GameRenderer {
  private mc: Minecraft;

  constructor(mcIn: Minecraft) {
    this.mc = mcIn;
  }

  public updateCameraAndRender(partialTicks: number, nanoTime: number, renderWorldIn: boolean) {
    if(!this.mc.skipRenderWorld) {
      const i = ~~(this.mc.mouseHelper.getMouseX() / this.mc.getMainCanvas().getGuiScaleFactor());
      const j = ~~(this.mc.mouseHelper.getMouseY() / this.mc.getMainCanvas().getGuiScaleFactor());

      const context: CanvasRenderingContext2D = this.mc.context;
    
      if(renderWorldIn && this.mc.world != null) {
        if(!this.mc.gameSettings.hideGUI || this.mc.currentScreen != null) {
          this.mc.ingameGUI.renderIngameGui(context!, partialTicks);
        }
      }

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      if(this.mc.currentScreen !== null) {
        try {
           this.mc.currentScreen.render(context!, i, j, this.mc.getTickLength());
        } catch(e) {
          Util.createLog(
            'Failed to render screen',
            '\n\nScreen render details:',
            `\n\tScreen name: ${this.mc.currentScreen.getClassName()}`,
            '\n\nMouse location:',
            `\n\tScaled: (${i}, ${j}). Absolute: (${this.mc.mouseHelper.getMouseX()}, ${this.mc.mouseHelper.getMouseY()})`,
            '\n\nScreen size:',
            `\n\tScaled: (${this.mc.getMainCanvas().getScaledWidth()}, ${this.mc.getMainCanvas().getScaledHeight()}). Absolute: (${window.innerWidth}, ${window.innerHeight}). Scale factor of ${this.mc.getMainCanvas().getGuiScaleFactor()}`,
            '\n\nMore Details:',
            `\n\t${e}`
          )

          this.mc.displayGuiScreen(new MainMenuScreen());
        }
      }
    }
  }

  public tick(): void {}
}