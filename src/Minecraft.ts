import SoundHandler from './audio/SoundHandler';
import GameConfiguration from './GameConfiguration'
import GameRenderer from './GameRenderer';
import GameSettings from './GameSettings'
import FontRenderer from './gui/FontRenderer';
import IngameGui from './gui/IngameGui';
import LoadingGui from './gui/LoadingGui';
import GuiScreen from './gui/screen/GuiScreen';
import IngameMenuScreen from './gui/screen/IngameMenuScreen';
import MainMenuScreen from './gui/screen/MainMenuScreen';
import MultiplayerScreen from './gui/screen/MultiplayerScreen';
import IWindowEventListener from './interface/IWindowEventListener';
import MainCanvas from './MainCanvas';
import ResourceLocation from './new/ResourceLocation';
import TextureBuffer from './new/TextureBuffer';
import TextureManager from './new/TextureManager';
import LanguageManager from './new/LanguageManager';
import KeyboardListener from './util/KeyboardListener';
import MouseHelper from './util/MouseHelper';
import Splashes from './new/Splashes';
import Timer from './util/Timer';
import Util from './util/Util';
import ResourceLoadingGui from './new/ResourceLoadingGui';
import JSONUtils from './util/JSONUtils';
import Session from './new/util/Session';
import SoundManager from './new/audio/SoundManager';
import SoundEvents from './new/util/SoundEvents';

var stop = false;
var frameCount = 0;
var fps: any, fpsInterval: any, startTime: any, now: any, then: any, elapsed: any;

export default class Minecraft implements IWindowEventListener {
  private static instance: Minecraft;
  private mainCanvas: MainCanvas;
  private timer: Timer = new Timer(20, 0);
  public fontRenderer: FontRenderer;
  public gameRenderer: GameRenderer;
  public gameSettings: GameSettings;
  private soundHandler: SoundHandler;
  public ingameGUI: IngameGui;
 
  public mouseHelper: MouseHelper;
  public keyboardListener: KeyboardListener;
  public running: boolean = true;
  public currentScreen: GuiScreen | null = null;
  private isGamePaused!: boolean;
  public skipRenderWorld!: boolean;
  private renderPartialTicksPaused!: number;
  public world: any = null;
  public context: CanvasRenderingContext2D;
  public textureBuffer: TextureBuffer;

  private fps: number = 0;
  private times: Array<number> = [];

  private deviceRefreshRate: any;
  private maxFPS: number;
  private timeNow: any;
  private timeThen: any;
  private timeElapsed: any;

  private testPlayerName: string = 'Steve';

  private isDemo: boolean;
  private launchedVersion: string;
  private versionType: string;
  private enableMultiplayer: boolean;
  private enableChat: boolean;
  private session: Session;

  private textureManager: TextureManager;
  private languageManager: LanguageManager;
  private soundManager: SoundManager;
  private splashes: Splashes;

  public loadingGui: ResourceLoadingGui | null = null;
  public isReloading: boolean = false;

  constructor(gameConfig: GameConfiguration) {
    Minecraft.instance = this;

    this.launchedVersion = gameConfig.gameInfo.version;
    this.versionType = gameConfig.gameInfo.versionType;
    this.isDemo = gameConfig.gameInfo.isDemo;
    this.enableMultiplayer = !gameConfig.gameInfo.disableMultiplayer;
    this.enableChat = !gameConfig.gameInfo.disableChat;
    this.session = gameConfig.userInfo.session;
    ResourceLocation.assetsDir  = gameConfig.folderInfo.assetsDir;
    this.gameSettings = new GameSettings(this);

    this.textureManager = new TextureManager();
    this.textureBuffer = this.textureManager.textureBuffer;
    this.splashes = new Splashes(this.session);
    this.languageManager = new LanguageManager();
    this.soundManager = new SoundManager(this.gameSettings);

    this.soundHandler = new SoundHandler(this, this.gameSettings);
    this.mainCanvas = new MainCanvas(this);
    this.context = this.mainCanvas.getCanvas().getContext('2d')!;
    this.mouseHelper = new MouseHelper(this);
    this.mouseHelper.registerCallbacks();
    this.keyboardListener = new KeyboardListener(this);
    this.keyboardListener.setupCallbacks();
    this.fontRenderer = new FontRenderer();
    this.forceUnicodeFont(this.getForceUnicodeFont());
    this.gameRenderer = new GameRenderer(this);
    this.ingameGUI = new IngameGui(this);
    this.maxFPS = this.gameSettings.framerateLimit;
    this.updateWindowSize();

    this.displayGuiScreen(new MainMenuScreen(true));
    this.loadResources();
  }

  public async loadResources() {
    this.setLoadingGui(new ResourceLoadingGui(this));
    this.isReloading = true;

    await this.textureManager.load();
    await this.fontRenderer.load();
    await this.languageManager.reload();
    await this.soundManager.reload();
    await this.splashes.reload();

    this.isReloading = false;
    this.setLoadingGui(null);
    return this.currentScreen?.initScreen(this, this.getMainCanvas().getScaledWidth(), this.getMainCanvas().getScaledHeight());;
  }

  public run(): void {
    this.timeThen = Date.now();

    try {
      this.getRefreshRate().then(fps => {
        this.deviceRefreshRate = fps;

        if(this.deviceRefreshRate !== null || this.deviceRefreshRate !== undefined) {
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
            
            this.timeNow = Date.now();
            this.timeElapsed = this.timeNow - this.timeThen;
  
            let fpsMS = 1000 / (this.gameSettings.vsync ? this.deviceRefreshRate : this.maxFPS);
  
            if(this.timeElapsed > fpsMS) {
              this.timeThen = this.timeNow - (this.timeElapsed % fpsMS);
              if(this.running) {
                this.runGameLoop(!flag);
              } else {
                cancelAnimationFrame(loopFunc);
              }
            }
          }
          loop()
       }
      });

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
    let i = this.mainCanvas.calcGuiScale(this.gameSettings.guiScale, this.getForceUnicodeFont());
    this.mainCanvas.setGuiScale(i);
    this.context.canvas.width = window.innerWidth;
    this.context.canvas.height = window.innerHeight;
    this.context.scale(i, i);
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

  public forceUnicodeFont(forced: boolean) {
    this.fontRenderer.changeForceUnicodeFont(forced);
    if(forced) {
      this.getMainCanvas().setGuiScale(4);
      this.updateWindowSize();
    } else {
      this.getMainCanvas().setGuiScale(3);
      this.updateWindowSize();
    }
  }

  public setLoadingGui(loadingGuiIn: ResourceLoadingGui | null): void {
    this.loadingGui = loadingGuiIn;
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
    return '';
  }

  public isMultiplayerEnabled(): boolean {
    return this.enableMultiplayer;
  }

  public isChatEnabled(): boolean {
    return this.enableChat;
  }

  public isModdedClient(): boolean {
    return true;
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

  public getSoundHandler(): SoundHandler {
    return this.soundHandler;
  }

  public getTextureManager(): TextureManager {
    return this.textureManager;
  }

  public getRefreshRate() {
    return new Promise(resolve =>
      requestAnimationFrame(t1 =>
        requestAnimationFrame(t2 => resolve(1000 / (t2 - t1)))
      )
    )
  }

  public setFramerateLimit(limit: number): void {
    if(this.gameSettings.vsync || true) {
      this.maxFPS = this.deviceRefreshRate;
      return;
    }
    this.maxFPS = limit;
  }

  public testSwitchLang() {
    this.gameSettings.language == 'pt_pt' ? this.gameSettings.language = 'en_us' : this.gameSettings.language = 'pt_pt';
    this.gameSettings.saveOptions();
    this.updateWindowSize();
  }
}