import Minecraft from '../client/Minecraft'
import Exception from './exceptions/Exception'
import InputMappings from './InputMappings'

export default class MouseHelper {
  private readonly mc: Minecraft
  private posX: number
  private posY: number
  private activeButton: number = -1
  private mousePressedTime: number = 0

  public constructor (mcIn: Minecraft) {
    this.mc = mcIn
    this.posX = 0
    this.posY = 0
  }

  public setup (): void {
    InputMappings.setupMouseCallbacks((xPos: number, yPos: number) => {
      this.handleMouseMove(xPos, yPos)
    }, (button: number, action: number) => {
      this.handleMousePress(button, action)
    }, (deltaX: number, deltaY: number, movX: number, movY: number) => {
      this.handleScroll(deltaX, deltaY, movX, movY)
    })
  }

  private handleMouseMove (xPos: number, yPos: number): void {
    if (!this.mc.overlay) {
      if (this.mc.screen) {
        const x: number = xPos * (this.mc.getCanvas().getScaledWidth() / this.mc.getCanvas().getCanvasWidth())
        const y: number = yPos * (this.mc.getCanvas().getScaledHeight() / this.mc.getCanvas().getCanvasHeight())

        if (this.activeButton !== -1 && this.mousePressedTime > 0) {
          const x1: number = (xPos - this.posX) * (this.mc.getCanvas().getScaledWidth() / this.mc.getCanvas().getCanvasWidth())
          const y1: number = (yPos - this.posY) * (this.mc.getCanvas().getScaledHeight() / this.mc.getCanvas().getCanvasHeight())
          this.mc.screen.mouseDragged(x, y, this.activeButton, x1, y1)
        }
      }
    }

    this.posX = xPos - this.mc.getCanvas().getX()
    this.posY = yPos - this.mc.getCanvas().getY()
  }

  private handleMousePress (button: number, action: number): void {
    const isLeftClick = action === 1
    if (isLeftClick) {
      this.activeButton = button
      this.mousePressedTime = new Date().getTime()
    } else if (this.activeButton != -1) {
      this.activeButton = -1
    }

    if (!this.mc.overlay) {
      if (this.mc.screen) {
        const sPosX = this.posX * (this.mc.getCanvas().getScaledWidth() / this.mc.getCanvas().getCanvasWidth())
        const sPosY = this.posY * (this.mc.getCanvas().getScaledHeight() / this.mc.getCanvas().getCanvasHeight())
        if (isLeftClick) this.mc.screen.mouseClicked(sPosX, sPosY, button)
        else this.mc.screen.mouseReleased(sPosX, sPosY, button)
      }
    }
  }

  private handleScroll (deltaX: number, deltaY: number, movX: number, movY: number): void {
    const d0 = (this.mc.options.discreteMouseScroll ? Math.sign(deltaY) : deltaY) * this.mc.options.mouseWheelSensitivity
    if (!this.mc.overlay) {
      if (this.mc.screen) {
        const d1 = this.posX * (this.mc.getCanvas().getScaledWidth() / this.mc.getCanvas().getCanvasWidth())
        const d2 = this.posY * (this.mc.getCanvas().getScaledHeight() / this.mc.getCanvas().getCanvasHeight())
        this.mc.screen.mouseScrolled(d1, d2, -d0)
      }/*  else if (this.mc.player !== null) {
        if (this.accumulatedScroll != 0.0 && Math.sign(d0) !== Math.sign(this.accumulatedScroll)) {
          this.accumulatedScroll = 0.0
        }

        this.accumulatedScroll += d0
        const f1 = (~~this.accumulatedScroll)
        if (f1 === 0) {
          return
        }

        this.accumulatedScroll -= f1

        this.mc.player.swapPaint(f1)
      } */
    }
  }

  public getPosX (): number {
    return this.posX
  }

  public getPosY (): number {
    return this.posY
  }
}
