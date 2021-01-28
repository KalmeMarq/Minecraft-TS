import GameConfiguration from "./GameConfiguration.js";
import MainMenuScreen from "./gui/screens/MainMenuScreen.js";
import ScreenP from "./gui/screens/ScreenP.js";
import { Resources } from "./index.js";
import KeyboardListener from "./utils/KeyboardListener.js";
import MouseHelper from "./utils/MouseHelper.js";

export default class Minecraft {
  protected gameconfiguration: GameConfiguration;
  public context: CanvasRenderingContext2D = (<HTMLCanvasElement>document.getElementById('root')).getContext('2d')!;
  public mouseHelper: MouseHelper;
  public keyboardListener: KeyboardListener;
  public canvasX = 0;
  public ResourcesData: any = Resources;
  public canvasY = 0;
  public canvasWidth = window.innerWidth;
  public canvasHeight = window.innerHeight;
  public scaleFactor = 3;
  private fps: number = 0;
  private times: Array<number> = [];
  public running: boolean = true;
  public showFps: boolean = false;
  public currentScreen: ScreenP | null = null;

  constructor(gameConfig: GameConfiguration) {
    this.gameconfiguration = gameConfig;
    this.mouseHelper = new MouseHelper(this, this.context);
    this.keyboardListener = new KeyboardListener(this);
    this.mouseHelper.registerCallbacks();
    this.keyboardListener.setupCallbacks();
    this.updateCanvasSize();
    this.run();
  }

  public shutdown() {
    this.running = false;
    window.close()
  }

  public setFpsVisibility(state: boolean) {
    this.showFps = state;
  }

  public isFpsVisible() {
    return this.showFps;
  }

  public run() {
    this.context.canvas.width = this.canvasWidth;
    this.context.canvas.height = this.canvasHeight;
    this.context.scale(this.scaleFactor, this.scaleFactor);
    this.context.imageSmoothingEnabled = false;

    const runLoop = () => {
      // this.context.clearRect(this.canvasX, this.canvasY, this.canvasWidth, this.canvasHeight)
      requestAnimationFrame(runLoop);

      if(this.running) {
        this.displayGuiScreen(this.currentScreen);

        if(this.showFps) {
          this.context.save();
          this.context.fillStyle = 'red';
          this.context.font = '8px Arial';
          this.context.fillText(String(this.getFPS()), 2, 8);
          this.context.restore();
        }
      }
    }

    requestAnimationFrame(runLoop);
  }

  public getFPS(): number {
    var now = performance.now();
    while (this.times.length > 0 && this.times[0] <= now - 1000) this.times.shift();
    this.times.push(now);
    this.fps = this.times.length;
    return this.fps;
  }

  public displayGuiScreen(guiScreenIn: ScreenP | null): void {

    if(guiScreenIn === null) {
      guiScreenIn = new MainMenuScreen();
    }

    this.currentScreen = guiScreenIn;
    if(guiScreenIn !== null) {
      try {
        const i = this.mouseHelper.getMouseX();
        const j = this.mouseHelper.getMouseY();
        
        guiScreenIn.initScreen(this, this.canvasWidth / this.scaleFactor, this.canvasHeight / this.scaleFactor);
        this.currentScreen.renderScreen(this.context, i / this.scaleFactor, j / this.scaleFactor);
      } catch(e) {
        console.log(e);
      }
    }
  }

  public updateCanvasSize() {
    window.addEventListener('resize', () => {
      this.canvasWidth = window.innerWidth;
      this.canvasHeight = window.innerHeight;
      this.context.canvas.width = this.canvasWidth;
      this.context.canvas.height = this.canvasHeight;
      this.context.scale(this.scaleFactor, this.scaleFactor);
      this.context.imageSmoothingEnabled = false;
    });
  }

  public getScaleFactor() {
    return this.scaleFactor;
  }
}