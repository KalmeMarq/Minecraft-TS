import IGuiEventListener from "../interfaces/IGuiEventListener.js";
import Minecraft from "../Minecraft.js";

export default class MouseHelper {
  private minecraft: any;
  private context: any;
  private leftDown: boolean = false;
  private middleDown: boolean = false;
  private rightDown: boolean = false;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private ignoreFirstMove: boolean = true;
  private xVelocity: number = 0;
  private yVelocity: number = 0;
  private eventTime: number = 0;
  private accumulatedScrollDelta: number = 0;
  private activeButton: number = -1;
  private mouseGrabbed = false;
  
  constructor(minecraftIn: Minecraft, context: CanvasRenderingContext2D) {
    this.minecraft = minecraftIn;
    this.context = context;
  }

  private mouseButtonCallback(button: number, action: number) {
    const flag = action === 1;

    const btn = button;
    let x = this.mouseX / 3;
    let y = this.mouseY / 3;
    if(flag) {
      this.minecraft.currentScreen.mouseClicked(x, y, btn);
    } else {
      this.minecraft.currentScreen.mouseReleased(x, y, btn);
    }
  }

  private cursorPosCallback(xpos: number, ypos: number) {
    if (this.ignoreFirstMove) {
      this.mouseX = xpos;
      this.mouseY = ypos;
      this.ignoreFirstMove = false;
    }

    let iguieventlistener: IGuiEventListener = this.minecraft.currentScreen;
      if (iguieventlistener != null && this.minecraft.loadingGui == null) {
        let d0: number = xpos * this.minecraft.getScaleFactor()
        let d1: number = ypos * this.minecraft.getScaleFactor();

        iguieventlistener.mouseMoved(d0, d1);

        if (this.activeButton != -1 && this.eventTime > 0.0) {
            let d2: number = (xpos - this.mouseX) * this.minecraft.getScaleFactor();
            let d3: number = (ypos - this.mouseY) * this.minecraft.getScaleFactor();
            iguieventlistener.mouseDragged(d0, d1, this.activeButton, d2, d3);
        }
      }

      if (this.isMouseGrabbed()) {
        this.xVelocity += xpos - this.mouseX;
        this.yVelocity += ypos - this.mouseY;
      }

      this.mouseX = xpos;
      this.mouseY = ypos;
  }

  public isMouseGrabbed(): boolean {
    return this.mouseGrabbed;
  }

  private scrollCallback(xoffset: number, yoffset: number) {
    let d0 = (/* this.minecraft.gameSettings.discreteMouseScroll */true ? Math.sign(yoffset) : yoffset) * /* this.minecraft.gameSettings.mouseWheelSensitivity */ 1;
    if(this.minecraft.currentScreen != null) {
      let d1 = this.mouseX * this.minecraft.getScaleFactor();
      let d2 = this.mouseY * this.minecraft.getScaleFactor();
      this.minecraft.currentScreen.mouseScrolled(d1, d2, d0);
    }/*  else if (this.minecraft.player != null) {
        if (this.accumulatedScrollDelta != 0.0D && Math.signum(d0) != Math.signum(this.accumulatedScrollDelta)) {
          this.accumulatedScrollDelta = 0.0D;
        }

        this.accumulatedScrollDelta += d0;
        float f1 = (float)((int)this.accumulatedScrollDelta);
        if (f1 == 0.0F) {
          return;
        }

        this.accumulatedScrollDelta -= (double)f1;
        if (this.minecraft.player.isSpectator()) {
          if (this.minecraft.ingameGUI.getSpectatorGui().isMenuActive()) {
              this.minecraft.ingameGUI.getSpectatorGui().onMouseScroll((double)(-f1));
          } else {
              float f = MathHelper.clamp(this.minecraft.player.abilities.getFlySpeed() + f1 * 0.005F, 0.0F, 0.2F);
              this.minecraft.player.abilities.setFlySpeed(f);
          }
        } else {
          this.minecraft.player.inventory.changeCurrentItem((double)f1);
        }
    } */
  }

  public registerCallbacks(): void {
    this.context.canvas.addEventListener('mousemove', (e: MouseEvent) => {
      this.mouseX = e.clientX - this.minecraft.canvasX;
      this.mouseY = e.clientY - this.minecraft.canvasY;
    });

    this.context.canvas.addEventListener('mousedown', (e: MouseEvent) => {
      this.mouseButtonCallback(e.button, 1);
      this.cursorPosCallback(e.clientX, e.clientY);
    });

    this.context.canvas.addEventListener('mouseup', (e: MouseEvent) => {
      this.mouseButtonCallback(e.button, 0);
    });

    this.context.canvas.addEventListener('contextmenu', (e: MouseEvent) => {
      e.preventDefault();
    })

    this.context.canvas.addEventListener('wheel', (e: WheelEvent) => {
      this.scrollCallback(e.deltaX, e.deltaY);
    })
  }

  public getMouseX() {
    return this.mouseX;
  }

  public getMouseY() {
    return this.mouseY;
  }
}

 MouseHelper;