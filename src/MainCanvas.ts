import IWindowEventListener from "./interface/IWindowEventListener";
import Minecraft from "./Minecraft";

export default class MainCanvas {
  private mc: IWindowEventListener;
  private width: number = 0;
  private height: number = 0;
  private scaledWidth: number = 0;
  private scaledHeight: number = 0;
  private guiScaleFactor: number = 3;
  private canvas: HTMLCanvasElement;

  constructor(mcIn: Minecraft) {
    this.mc = mcIn;
    if(document.body.contains(document.getElementById('root'))) {
      this.canvas = <HTMLCanvasElement>document.getElementById('root');
    } else {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'root';
      document.body.prepend(this.canvas);
    }

    const style = document.createElement('style');
    style.innerHTML = '*{box-sizing:border-box;margin:0;padding:0;}body{background:rgb(50,50,50);height:100vh;}';
    document.head.appendChild(style);

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

  public calcGuiScale(guiScaleIn: number, forceUnicode: boolean): number {
    let i;
    for(i = 1; i != guiScaleIn && i < window.innerWidth && i < (window.innerHeight + 40) && window.innerWidth / (i + 1) >= 320 && (window.innerHeight + 40) / (i + 1) >= 240; ++i) {
    }

    if(forceUnicode && i % 2 != 0) {
      ++i;
    }

    return i;
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

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }
}