import GameSettings from './settings/GameSettings'
import CanvasUtil from '../util/CanvasUtil'
import GameLoop from '../util/GameLoop'
import KeyboardListener from '../util/KeyboardListener'
import MouseHelper from '../util/MouseHelper'
import Timer from '../util/Timer'
import StringBuilder from '../util/useless/StringBuilder'
import Util from '../util/Util'
import Player from '../world/player/Player'
import World, { ClientWorldInfo } from '../world/World'
import Canvas from './Canvas'
import LoadingGui from './gui/LoadingGui'
import Screen from './gui/screen/Screen'
import MainMenuScreen from './gui/screen/MainMenuScreen'
import ClientPlayer from './ClientPlayer'
import Difficulty from './settings/Difficulty'

export default class Minecraft {
  private static instance: Minecraft
  private readonly canvas: Canvas
  private readonly timer: Timer = new Timer(20, 0)
  private readonly loop: GameLoop = new GameLoop()
  public mouseHelper: MouseHelper;
  public keyboardListener: KeyboardListener;
  public overlay: LoadingGui | undefined;
  public screen: Screen | undefined;
  public options: GameSettings
  public level: World | undefined;
  public player: Player | undefined;

  public constructor () {
    Minecraft.instance = this
    this.canvas = new Canvas(this)
    this.mouseHelper = new MouseHelper(this);
    this.mouseHelper.setup();
    this.keyboardListener = new KeyboardListener(this);
    this.keyboardListener.setup();
    this.options = new GameSettings(this)
    this.updateCanvasSize()
    this.setScreen(new MainMenuScreen())
  }

  public updateCanvasSize (): void {
    const scale = this.canvas.calculateScale(3)
    this.canvas.setGuiScale(scale)
    this.canvas.updateSize()
    this.screen?.resize(this, this.canvas.getScaledWidth(), this.canvas.getScaledHeight());
    CanvasUtil.resetSetup(scale)
  }

  public createTitle (): string {
    const stringbuilder: StringBuilder = new StringBuilder('Minecraft')
    stringbuilder.append(' ')
    stringbuilder.append('GUI TS')
    return stringbuilder.toString()
  }

  public updateTitle (): void {
    document.title = this.createTitle()
  }

  public run (): void {
    this.loop.start(() => {
      this.runTick()
    })
  }

  public runTick (): void {
    const j = ~~this.timer.advanceTime(Util.getMillis())
    for (let k = 0; k < Math.min(10, j); ++k) {
      this.tick()
    }

    this.render()
  }

  public tick(): void {
    this.screen?.tick();
  }

  public render (): void {
    CanvasUtil.clear()

    let i = Math.floor(this.mouseHelper.getPosX() * this.getCanvas().getScaledWidth() / this.getCanvas().getCanvasWidth());
    let j = Math.floor(this.mouseHelper.getPosY() * this.getCanvas().getScaledHeight() / this.getCanvas().getCanvasHeight());

    if (this.overlay) {
      this.overlay.render(i, j, this.getDeltaFrameTime());
    } else {
      this.screen?.render(i, j, this.getDeltaFrameTime())
    }
    
    CanvasUtil.doLayerTasks()
    CanvasUtil.render()
  }

  public setScreen (screen: Screen | undefined): void {
    this.screen?.closeScreen()

    let scrn = screen
    if (screen instanceof MainMenuScreen) {
      this.options.showDebugInfo = false
    }

    if(scrn === undefined) {
      scrn = new MainMenuScreen();
    }

    this.screen = scrn
    this.screen?.initScreen(this, this.canvas.getScaledWidth(), this.canvas.getScaledHeight())

    this.updateTitle()
  }

  public static getInstance (): Minecraft {
    return this.instance;
  }

  public getCanvas(): Canvas {
    return this.canvas;
  }

  public getDeltaFrameTime (): number {
    return this.timer.tickDelta
  }
}
