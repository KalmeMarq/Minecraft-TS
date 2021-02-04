import IGuiEventListener from "../interfaces/IGuiEventListener.js";
import Minecraft from "../Minecraft.js";

export default class MouseHelper {
  private minecraft: any;
  private context: any;
  // private leftDown: boolean = false;
  // private middleDown: boolean = false;
  // private rightDown: boolean = false;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private ignoreFirstMove: boolean = true;
  private xVelocity: number = 0;
  private yVelocity: number = 0;
  private eventTime: number = 0;
  // private accumulatedScrollDelta: number = 0;
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
      this.activeButton = button;
      if(this.minecraft.currentScreen) this.minecraft.currentScreen.mouseClicked(x, y, btn);

    } else {
      this.activeButton = -1;
      if(this.minecraft.currentScreen) this.minecraft.currentScreen.mouseReleased(x, y, btn);
    }
  }

  private cursorPosCallback(xpos: number, ypos: number, button: number) {
    if (this.ignoreFirstMove) {
      this.mouseX = xpos;
      this.mouseY = ypos;
      this.ignoreFirstMove = false;
    }

    let iguieventlistener: IGuiEventListener = this.minecraft.currentScreen;
      if (iguieventlistener != null/*  && this.minecraft.loadingGui == null */) {
        let d0: number = xpos / this.minecraft.getScaleFactor()
        let d1: number = ypos / this.minecraft.getScaleFactor();

        iguieventlistener.mouseMoved(d0, d1);

        if (this.activeButton != -1/*  && this.eventTime > 0.0 *//* button == 0 */) {
          
            let d2: number = (xpos - this.mouseX) * this.minecraft.getScaleFactor();
            let d3: number = (ypos - this.mouseY) * this.minecraft.getScaleFactor();
          // console.log('is dragging', d2);
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
    let d0 = (this.minecraft.gameSettings.discreteMouseScroll ? Math.sign(yoffset) : yoffset) * this.minecraft.gameSettings.mouseWheelSensitivity;
    if(this.minecraft.currentScreen != null) {
      let d1 = this.mouseX * this.minecraft.getScaleFactor();
      let d2 = this.mouseY * this.minecraft.getScaleFactor();
      if(this.minecraft.currentScreen) this.minecraft.currentScreen.mouseScrolled(d1, d2, d0);
    }
  }

  public registerCallbacks(): void {
    this.context.canvas.addEventListener('mousemove', (e: MouseEvent) => {
      this.mouseX = e.clientX/*  - (<HTMLCanvasElement>document.querySelector('.window'))!.offsetLeft */;
      this.mouseY = e.clientY/*  - (<HTMLCanvasElement>document.querySelector('.window'))!.offsetTop - 40 */;
      this.cursorPosCallback(e.clientX, e.clientY, e.button);
    });

    this.context.canvas.addEventListener('mousedown', (e: MouseEvent) => {
      this.mouseButtonCallback(e.button, 1);
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

const isByte = (a: number) => {
  if(Number.isInteger(a) && !(a < -128 || a > 127)) return a
  else throw new Error('Number is not a byte')
}

const isShort = (a: number) => {
  if(Number.isInteger(a) && !(a < -32768 || a > 32767)) return a
  else throw new Error('Number is not a short')
}

const isInt = (a: number) => {
  if((Number.isInteger(a) || 0)  && !(a < 2E-21 && a > 2E31 - 1)) return a
  else throw new Error('Number is not an integer') 
}

const isLong = (a: number) => {
  if(Number.isInteger(a) && !(a < 2E-63 && a > 2E63 - 1)) return a
  else throw new Error('Number is not a long') 
}

const isFloat = (a: number) => {
  if(!(Number.isInteger(a) && (a < 2E-21 || a > 2E31 - 1))) return a
  else throw new Error('Number is not a float') 
}

const isDouble = (a: number) => {
  if(!(Number.isInteger(a) && a < 2E-63 || a > 2E63 - 1)) return a
  else throw new Error('Number is not a double') 
}

const byte = (a: number) => isByte(~~a);
const short = (a: number) => isShort(~~a);
const int = (a: number) => isInt(~~a);
const long = (a: number) => isLong(~~a);
const float = (a: number) => isFloat(a);
const double = (a: number) => isDouble(a);

export {
  isByte,
  isShort,
  isInt,
  isLong,
  isFloat,
  isDouble,
  byte,
  short,
  int,
  long,
  float,
  double
}