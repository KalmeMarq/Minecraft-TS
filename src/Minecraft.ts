import GameConfiguration from "./GameConfiguration.js";
import GameSettings from "./GameSettings.js";
import FontRenderer from "./gui/FontRenderer.js";
import MainMenuScreen from "./gui/screens/MainMenuScreen.js";
import Screen from "./gui/screens/Screen.js";
import { Resources, ResourcesSplashes } from "./index.js";
import KeyboardListener from "./utils/KeyboardListener.js";
import MouseHelper from "./utils/MouseHelper.js";

export default class Minecraft {
  protected gameconfiguration: GameConfiguration;
  public context: CanvasRenderingContext2D = (<HTMLCanvasElement>document.getElementById('root')).getContext('2d')!;
  public mouseHelper: MouseHelper;
  public keyboardListener: KeyboardListener;
  public canvasX = 0;
  public canvasY = 0;
  public gameSettings: GameSettings;
  public ResourcesData: Resources = Resources;
  public canvasWidth = window.innerWidth;
  public canvasHeight = window.innerHeight;
  public scaleFactor = 3;
  private fps: number = 0;
  private times: Array<number> = [];
  public running: boolean = true;
  public currentScreen: Screen | null = null;

  constructor(gameConfig: GameConfiguration) {
    this.gameconfiguration = gameConfig;
    this.gameSettings = new GameSettings(this);
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
    this.gameSettings.showFPS = state;
  }

  public isFpsVisible() {
    return this.gameSettings.showFPS;
  }

  public getSplashText(): string {
    function getRandSplash() {
      const splashes = ResourcesSplashes,
            date = new Date(),
            month = date.getMonth(),
            day = date.getDate();
  
      const getRandomSplashText = () => {
        return splashes[~~(Math.random() * (splashes.length - 1))]
      }
  
      let randSplash = String(getRandomSplashText());
  
      if(month + 1 === 12 && day === 24) randSplash = 'Merry X-mas!';
      else if (month + 1 === 1 && day === 1) randSplash = 'Happy new year!';
      else if(month + 1 === 10 && day === 31) randSplash = 'OOoooOOOoooo! Spooky!';
  
      return randSplash;
    }

    return getRandSplash();
  }

  public run() {
    this.context.canvas.width = this.canvasWidth;
    this.context.canvas.height = this.canvasHeight;
    this.context.scale(this.scaleFactor, this.scaleFactor);
    this.context.imageSmoothingEnabled = false;
    const runLoop = () => {
      requestAnimationFrame(runLoop);

      if(this.running) {
        this.displayGuiScreen(this.currentScreen);
        if(this.gameSettings.showFPS) {
          this.context.save();
          this.context.scale(0.666, 0.666);
          FontRenderer.drawStringWithShadow(this.context, `${String(this.getFPS())}/${this.gameSettings.framerateLimit}`, 2, 2, 16777215, []);
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
    return this.fps > this.gameSettings.framerateLimit ? this.gameSettings.framerateLimit : this.fps;
  }

  public displayGuiScreen(guiScreenIn: Screen | null): void {
    if (this.currentScreen != null) this.currentScreen.onClose();

    if(guiScreenIn === null) guiScreenIn = new MainMenuScreen();

    this.currentScreen = guiScreenIn;
    if(guiScreenIn !== null) {
      try {
        const i = this.mouseHelper.getMouseX(),
              j = this.mouseHelper.getMouseY();
    
        guiScreenIn.initScreen(this, this.canvasWidth / this.scaleFactor, this.canvasHeight / this.scaleFactor);
        guiScreenIn.renderObject(this.context, i / this.scaleFactor, j / this.scaleFactor);
      } catch(e) {
        console.log(e);
      }
    }
  }

  public updateCanvasSize(): void {
    window.addEventListener('resize', () => {
      this.canvasWidth = window.innerWidth;
      this.canvasHeight = window.innerHeight;
      this.context.canvas.width = this.canvasWidth;
      this.context.canvas.height = this.canvasHeight;
      this.context.scale(this.scaleFactor, this.scaleFactor);
      this.context.imageSmoothingEnabled = false;
    });
  }

  public getScaleFactor(): number {
    return this.scaleFactor;
  }
}