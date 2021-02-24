import IWindowEventListener from "./interface/IWindowEventListener";
import Minecraft from "./Minecraft";

export default class MainCanvas {
  private mc: IWindowEventListener;
  private width: number = 0;
  private height: number = 0;
  private scaledWidth: number = 0;
  private scaledHeight: number = 0;
  private guiScaleFactor: number = 3;

  constructor(mcIn: Minecraft) {
    this.mc = mcIn;

    window.addEventListener('resize', () => {
      this.mc.updateWindowSize();
    })
  }

  public setGuiScale(scaleFactor: number): void {
    this.guiScaleFactor = scaleFactor;
    const i = ~~(window.innerWidth / scaleFactor);
    this.scaledWidth = i;
    const j = ~~(window.innerHeight / scaleFactor);
    this.scaledHeight = j;
  }

  public getScaledWidth(): number {
    return ~~this.scaledWidth;
  }

  public getScaledHeight(): number {
    return ~~this.scaledHeight;
  }

  public getGuiScaleFactor() {
    return this.guiScaleFactor;
  }
}