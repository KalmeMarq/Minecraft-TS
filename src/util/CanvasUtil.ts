export default class CanvasUtil {
  private static canvas: HTMLCanvasElement
  private static buffercanvas: HTMLCanvasElement
  private static ctx: CanvasRenderingContext2D
  private static buffer: CanvasRenderingContext2D
  private static readonly layerTasks: Map<number, Function> = new Map()

  public static clear (preserveTransform = false): void {
    if (preserveTransform) {
      this.buffer.save()
      this.buffer.setTransform(1, 0, 0, 1, 0, 0)
    }
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.buffer.clearRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height)
    if (preserveTransform) this.buffer.restore()
  }

  public static setCtxBuffer (canvas: HTMLCanvasElement, buffercanvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, buffer: CanvasRenderingContext2D): void {
    this.canvas = canvas
    this.ctx = ctx
    this.buffercanvas = buffercanvas
    this.buffer = buffer
  }

  public static render (): void {
    this.ctx.drawImage(this.buffercanvas as any, 0, 0)
  }

  public static resetSetup (scale: number, pixelated = true): void {
    this.buffer.setTransform(scale, 0, 0, scale, 0, 0)
    this.buffer.imageSmoothingEnabled = !pixelated
  }

  public static fillRect (minX: number, minY: number, maxX: number, maxY: number, r = 255, g = 255, b = 255, a = 1): void {
    this.buffer.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
    this.buffer.fillRect(minX, minY, maxX - minX, maxY - minY)
  }

  /* New */
  public static translateXY (x: number, y: number): void {
    this.buffer.translate(x, y)
  }

  public static rotateA (angle: number, x?: number, y?: number): void {
    this.buffer.translate((x ?? 0), (y ?? 0))
    this.buffer.rotate(angle)
    this.buffer.translate(-(x ?? 0), -(y ?? 0))
  }

  public static fillText (text: string, x: number, y: number, r: number, g: number, b: number, a?: number): void {
    this.buffer.font = '10px minecraft'
    this.buffer.fillStyle = `${a ? 'rgba' : 'rgb'}(${r},${g},${b}${a ? `,${a}` : ''})`
    this.buffer.fillText(text, x, y)
  }

  public static fontWidth (text: string): number {
    this.ctx.font = '10px minecraft'
    return this.ctx.measureText(text).width
  }

  public static doLayerTasks (): void {
    new Map([...this.layerTasks.entries()].sort((a: any, b: any) => a - b)).forEach(task => {
      task()
    })

    this.layerTasks.clear()
  }
}