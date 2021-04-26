import Minecraft from './Minecraft'
import CanvasUtil from './util/CanvasUtil'

export default class Canvas {
  private readonly mc: Minecraft
  private bufferCanvas: HTMLCanvasElement
  private canvas: HTMLCanvasElement
  private width = 0
  private height = 0
  private scaledWidth = 0
  private scaledHeight = 0
  private guiScale = 1
  private readonly resizeEventHandler: () => void

  public constructor (mcIn: Minecraft) {
    this.mc = mcIn

    this.bufferCanvas = document.createElement('canvas')
    this.canvas = document.createElement('canvas')

    document.body.appendChild(this.canvas)

    CanvasUtil.setCtxBuffer(this.canvas, this.bufferCanvas, this.canvas.getContext('2d') as CanvasRenderingContext2D, this.bufferCanvas.getContext('2d') as CanvasRenderingContext2D)

    this.resizeEventHandler = () => { this.handleResize() }
    window.addEventListener('resize', this.resizeEventHandler)
  }

  public updateSize (): void {
    this.bufferCanvas.width = window.innerWidth
    this.bufferCanvas.height = window.innerHeight
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  public updateCanvasSize (): void {
    this.width = this.canvas.width = this.bufferCanvas.width = window.innerWidth
    this.height = this.canvas.height = this.bufferCanvas.width = window.innerHeight
  }

  public handleResize (): void {
    this.updateCanvasSize()
    this.mc.updateCanvasSize()
  }

  public calculateScale (scale: number): number {
    let i
    for (i = 1; i !== scale && i < window.innerWidth && i < window.innerHeight && window.innerWidth / (i + 1) >= 320 && window.innerHeight / (i + 1) >= 240; ++i);
    return i
  }

  public setGuiScale (scale: number): void {
    this.guiScale = scale
    const i = ~~(window.innerWidth / scale)
    this.scaledWidth = window.innerWidth / scale > i ? i + 1 : i
    const j = ~~(window.innerHeight / scale)
    this.scaledHeight = window.innerHeight / scale > j ? j + 1 : j
  }

  public getCanvas (): HTMLCanvasElement {
    return this.canvas
  }

  public getCanvasWidth (): number {
    return this.width
  }

  public getCanvasHeight (): number {
    return this.height
  }

  public getScaledWidth (): number {
    return this.scaledWidth
  }

  public getScaledHeight (): number {
    return this.scaledHeight
  }

  public getScaleFactor (): number {
    return this.guiScale
  }
}
