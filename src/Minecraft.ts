import GameConfiguration from "./GameConfiguration";
import GameSettings from "./GameSettings";
import FontRenderer from "./gui/FontRenderer";
import MainMenuScreen from "./gui/screens/MainMenuScreen";
import Screen from "./gui/screens/Screen";
import { Resources } from "./index";
import { IResources } from "./utils/GetResources";
import KeyboardListener from "./utils/KeyboardListener";
import MouseHelper from "./utils/MouseHelper";

class Timer {
  public renderPartialTicks = 0;
  public elapsedPartialTicks = 0;
  private lastSyncSysClock = 0;
  private tickLength = 0;

  constructor(ticks: number, lastSyncSysClock: number) {
     this.tickLength = 1000.0 / ticks;
     this.lastSyncSysClock = lastSyncSysClock;
  }

  public getPartialTicks(gameTime: number) {
     this.elapsedPartialTicks = (gameTime - this.lastSyncSysClock) / this.tickLength;
     this.lastSyncSysClock = gameTime;
     this.renderPartialTicks += this.elapsedPartialTicks;
     let i = Math.ceil(this.renderPartialTicks);
     this.renderPartialTicks -= i;
     return i;
  }
}


export default class Minecraft {
  protected gameconfiguration: GameConfiguration;
  public context: CanvasRenderingContext2D = (<HTMLCanvasElement>document.getElementById('root')).getContext('2d')!;
  public mouseHelper: MouseHelper;
  public keyboardListener: KeyboardListener;
  public canvasX = 0;
  public canvasY = 0;
  public gameSettings: GameSettings;
  public ResourcesData: IResources = Resources;
  public canvasWidth = window.innerWidth;
  public canvasHeight = window.innerHeight;
  public scaleFactor = 3;
  private fps: number = 0;
  private timer: Timer = new Timer(20.0, 0);
  private times: Array<number> = [];
  public running: boolean = true;
  public currentScreen: Screen | null = null;
  public outputLog = ''

  constructor(gameConfig: GameConfiguration) {
    this.gameconfiguration = gameConfig;
    this.gameSettings = new GameSettings(this);
    this.mouseHelper = new MouseHelper(this, this.context);
    this.keyboardListener = new KeyboardListener(this);
    this.mouseHelper.registerCallbacks();
    this.keyboardListener.setupCallbacks();
    this.updateCanvasSize();
    this.run();
    this.outputLog = ''
  }

  public shutdown() {
    this.running = false;
    console.log(this.outputLog);
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
      const splashes = Resources.texts.splashes,
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

        if (true) {
          let j = this.timer.getPartialTicks(new Date().getMilliseconds());

          for(var k = 0; k < Math.min(10, j); ++k) {
              this.runTick();
          }
        }

        if(this.gameSettings.showFPS) {
          this.context.save();
          this.context.scale(0.666, 0.666);
          let fps = this.gameSettings.vsync ? (this.getFPS() > this.gameSettings.framerateLimit ? this.gameSettings.framerateLimit : this.getFPS()) : this.getFPS()
          FontRenderer.drawStringWithShadow(this.context, `${String(fps)}/${this.gameSettings.framerateLimit}`, 2, 2, 16777215, []);
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

  public runTick(): void {
    if(this.currentScreen != null) {
      this.currentScreen.tick();
    }
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

  public isDemo(): boolean {
    return this.gameconfiguration.gameInfo.isDemo;
  }

  public isModdedClient(): boolean {
    return this.gameconfiguration.gameInfo.clientName !== 'vanilla';
  }

  public getVersionType(): string {
    return this.gameconfiguration.gameInfo.versionType;
  }

  public getVersion(): string {
    return this.gameconfiguration.gameInfo.version;
  }

  public getUsername(): string {
    return this.gameconfiguration.userInfo.userName;
  }
}