import GameConfiguration from './GameConfiguration'
import GameRenderer from './GameRenderer';
import GameSettings from './GameSettings'
import GuiScreen from './gui/screen/GuiScreen';
import IngameGui from './gui/IngameGui';
import IngameMenuScreen from './gui/screen/IngameMenuScreen';
import MainMenuScreen from './gui/screen/MainMenuScreen';
import MultiplayerScreen from './gui/screen/MultiplayerScreen';
import Timer from './util/Timer';
import Util from './util/Util';
import MouseHelper from './util/MouseHelper';
import IWindowEventListener from './interface/IWindowEventListener';
import MainCanvas from './MainCanvas';
import FontRenderer from './gui/FontRenderer';
import KeyboardListener from './util/KeyboardListener';
import { getResourceLocation } from './util/Resources';
import Splashes from './util/Splashes';
import TextureBuffer from './util/TextureBuffer';
import LoadingGui from './gui/LoadingGui';
import LanguageManager from './resources/LanguageManager';

export default class Minecraft implements IWindowEventListener {
  private static instance: Minecraft;
  private mainCanvas: MainCanvas;
  private timer: Timer = new Timer(20, 0);
  public fontRenderer: FontRenderer;
  public gameRenderer: GameRenderer;
  public gameSettings: GameSettings;
  private splashes: Splashes;
  public loadingGui: LoadingGui | null = null;
  public ingameGUI: IngameGui;
  private isDemo: boolean;
  private launchedVersion: string;
  private versionType: string;
  private enableMultiplayer: boolean;
  private enableChat: boolean;
  private languageManager: LanguageManager;
  public mouseHelper: MouseHelper;
  public keyboardListener: KeyboardListener;
  public running: boolean = true;
  public currentScreen: GuiScreen | null = null;
  private isGamePaused!: boolean;
  public skipRenderWorld!: boolean;
  private renderPartialTicksPaused!: number;
  public world: any = null;
  public context = <CanvasRenderingContext2D>(<HTMLCanvasElement>document.getElementById('root')).getContext('2d');
  private fps: number = 0;
  private times: Array<number> = [];
  public textureBuffer: TextureBuffer;

  private testPlayerName: string = 'Steve';

  constructor(gameConfig: GameConfiguration) {
    Minecraft.instance = this;
    this.textureBuffer = new TextureBuffer();
    this.launchedVersion = gameConfig.gameInfo.version;
    this.versionType = gameConfig.gameInfo.versionType;
    this.isDemo = gameConfig.gameInfo.isDemo;
    this.enableMultiplayer = !gameConfig.gameInfo.disableMultiplayer;
    this.enableChat = !gameConfig.gameInfo.disableChat;
    this.testPlayerName = gameConfig.userInfo.userName;
    this.splashes = new Splashes();
    this.gameSettings = new GameSettings(this);
    this.languageManager = new LanguageManager(this.gameSettings.language);
    this.mainCanvas = new MainCanvas(this);
    this.mouseHelper = new MouseHelper(this);
    this.mouseHelper.registerCallbacks();
    this.keyboardListener = new KeyboardListener(this);
    this.keyboardListener.setupCallbacks();
    this.fontRenderer = new FontRenderer();
    this.gameRenderer = new GameRenderer(this);
    this.ingameGUI = new IngameGui(this);
    this.displayGuiScreen(new MainMenuScreen(true));
    this.updateWindowSize();
  }

  public run(): void {
    try {
      let flag: boolean = false;
      let loopFunc;
      
      const loop = () => {
        (<any>window)['setRunning'] = (flag: boolean) => {
          if(flag) {
            this.running = true;
            loopFunc = requestAnimationFrame(loop);
            return true;
          }

          this.running = false;
          return false;
        }

        loopFunc = requestAnimationFrame(loop);
        
        if(this.running) {
          this.runGameLoop(!flag);
        } else {
          cancelAnimationFrame(loopFunc);
        }
      }
      loop()

    } catch(e) {
      Util.createLog(
        'Couldn\'t run Minecraft!',
        '\n\nMore Details:',
        `\n\t${e}`
      )
    }
  }

  public getFPS(): number {
    var now = performance.now();
    while (this.times.length > 0 && this.times[0] <= now - 1000) this.times.shift();
    this.times.push(now);
    this.fps = this.times.length;
    return this.fps;
  }

  private runGameLoop(renderWorldIn: boolean): void {
    let i = Util.nanoTime();

    if(renderWorldIn) {
      let j = this.timer.getPartialTicks(Util.milliTime());

      for(let k = 0; k < Math.min(10, j); ++k) this.runTick();
    }

    if(!this.skipRenderWorld) this.gameRenderer.updateCameraAndRender(this.isGamePaused ? this.renderPartialTicksPaused : this.timer.renderPartialTicks, i, renderWorldIn);

    let flag = (this.currentScreen != null && this.currentScreen.isPauseScreen()) && !false;
    if(this.isGamePaused != flag) {
      if (this.isGamePaused) this.renderPartialTicksPaused = this.timer.renderPartialTicks;
      else this.timer.renderPartialTicks = this.renderPartialTicksPaused;
       
      this.isGamePaused = flag;
    }
  }

  public updateWindowSize(): void {
    this.mainCanvas.setGuiScale(this.mainCanvas.getGuiScaleFactor());
    this.context.canvas.width = window.innerWidth;
    this.context.canvas.height = window.innerHeight;
    this.context.scale(this.mainCanvas.getGuiScaleFactor(), this.mainCanvas.getGuiScaleFactor());
    this.context.imageSmoothingEnabled = false;

    if(this.currentScreen != null) {
      this.currentScreen.resize(this, this.mainCanvas.getScaledWidth(), this.mainCanvas.getScaledHeight());
    }
  }

  public shutdown(): void {
    this.running = false;
  }

  public isRunning(): boolean {
    return this.running;
  }

  public displayInGameMenu(pauseOnly: boolean): void {
    if(this.currentScreen == null) {
       const flag = true;
       if(flag) this.displayGuiScreen(new IngameMenuScreen(!pauseOnly));
       else this.displayGuiScreen(new IngameMenuScreen(true));
    }
  }

  public runTick(): void {
    if(!this.isGamePaused) this.ingameGUI.tick();

    if(this.currentScreen !== null) {
      GuiScreen.wrapScreenError(() => {
         this.currentScreen!.tick();
      }, 'Ticking screen', this.currentScreen.getClassName());
    }

    if(!this.gameSettings.showDebugInfo) this.ingameGUI.reset();

    if(this.currentScreen == null || this.currentScreen.passEvents) this.processKeyBinds();

    if (this.world != null && !this.isGamePaused) this.gameRenderer.tick();
  }

  private processKeyBinds(): void {}

  public displayGuiScreen(guiScreenIn: GuiScreen | null): void {
    if(this.currentScreen != null) this.currentScreen.onClose();

    if(guiScreenIn == null && this.world == null) guiScreenIn = new MainMenuScreen();

    if(guiScreenIn instanceof MainMenuScreen || guiScreenIn instanceof MultiplayerScreen) {
       this.gameSettings.showDebugInfo = false;
    }

    this.currentScreen = guiScreenIn;
    
    if(guiScreenIn != null) {
      guiScreenIn.initScreen(this, this.mainCanvas.getScaledWidth(), this.mainCanvas.getScaledHeight());
    }
  }

  public static getInstance(): Minecraft {
    return Minecraft.instance;
  }

  public static isGuiEnabled(): boolean {
    return !this.instance.gameSettings.hideGUI;
  }

  public getIsDemo(): boolean {
    return this.isDemo;
  }

  public getVersion(): string {
    return this.launchedVersion;
  }

  public getVersionType(): string {
    return this.versionType;
  }

  public getForceUnicodeFont(): boolean {
    return this.gameSettings.forceUnicodeFont;
  } 

  public getPlayerName(): string {
    return this.testPlayerName;
  }

  public isMultiplayerEnabled(): boolean {
    return this.enableMultiplayer;
  }

  public isChatEnabled(): boolean {
    return this.enableChat;
  }

  public isModdedClient(): boolean {
    return false;
  }

  public getIsGamePaused(): boolean {
    return this.isGamePaused;
  }

  public getRenderPartialTicks(): number {
    return this.timer.renderPartialTicks;
  }

  public getTickLength(): number {
    return this.timer.elapsedPartialTicks;
  }

  public getMainCanvas(): MainCanvas {
    return this.mainCanvas;
  }

  public getSplashes(): Splashes {
    return this.splashes;
  }

  public getLanguageManager(): LanguageManager {
    return this.languageManager;
  }
}