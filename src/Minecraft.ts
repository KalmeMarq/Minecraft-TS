import Canvas from './Canvas'
import CanvasUtil from './util/CanvasUtil'
import GameLoop from './util/GameLoop'
import Timer from './util/Timer'
import StringBuilder from './util/useless/StringBuilder'
import Util from './util/Util'
import Screen from './gui/screen/Screen'
import MainMenuScreen from './gui/screen/MainMenuScreen'
import GameSettings from './settings/GameSettings'

export default class Minecraft {
  private static instance: Minecraft
  private readonly canvas: Canvas
  private readonly timer: Timer = new Timer(20, 0)
  private readonly loop: GameLoop = new GameLoop()
  public screen: Screen | null = null
  public options: GameSettings

  public constructor () {
    Minecraft.instance = this
    this.canvas = new Canvas(this)
    this.options = new GameSettings(this)
    this.updateCanvasSize()

    this.setScreen(new MainMenuScreen())
  }

  public updateCanvasSize (): void {
    const i = this.canvas.calculateScale(3)
    this.canvas.setGuiScale(i)
    this.canvas.updateSize()
    CanvasUtil.resetSetup(i)
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
    }

    this.render()
  }

  public render (): void {
    CanvasUtil.clear()
    if (this.screen !== null) {
      this.screen.render(0, 0, this.timer.partialTick)
    }
    CanvasUtil.doLayerTasks()
    CanvasUtil.render()
  }

  public setScreen (screen: Screen | null): void {
    if (this.screen != null) this.screen.closeScreen()

    const s = screen
    if (screen instanceof MainMenuScreen) {
      this.options.showDebugInfo = false
    }

    this.screen = s
    if (screen !== null) {
      this.screen?.initScreen(this, this.canvas.getScaledWidth(), this.canvas.getScaledHeight())
    }

    this.updateTitle()
  }

  public static getInstance (): Minecraft {
    return this.instance
  }

  public getDeltaFrameTime (): number {
    return this.timer.tickDelta
  }
}
