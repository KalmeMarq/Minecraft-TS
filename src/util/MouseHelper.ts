import GuiScreen from '../gui/screen/GuiScreen';
import IGuiEventListener from '../interface/IGuiEventListener';
import Minecraft from '../Minecraft.js';
import InputMappings from './InputMappings';

export default class MouseHelper {
  private minecraft: Minecraft;
  private leftDown: boolean = false;
  private middleDown: boolean = false;
  private rightDown: boolean = false;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private ignoreFirstMove: boolean = true;
  private touchScreenCounter: number = 0;
  private eventTime: number = 0;
  private accumulatedScrollDelta: number = 0;
  private activeButton: number = -1;
  
  constructor(minecraftIn: Minecraft) {
    this.minecraft = minecraftIn;
  }

  public registerCallbacks(): void {
    InputMappings.setMouseCallbacks((xPos: number, yPos: number) => {
      this.cursorPosCallback(xPos, yPos)
    }, (button: number, action: number, modifiers: any) => {
      this.mouseButtonCallback(button, action)
    }, (xDelta: number, yDelta: number) => {
      this.scrollCallback(xDelta, yDelta);
    })
  }

  private mouseButtonCallback(button: number, action: number) {
    const flag = action === 1;

    const btn = button;

    if(flag) {
      this.activeButton = btn;
    } else if(this.activeButton != -1) {
      this.activeButton = -1;
    }

    let aboolean: boolean[] = new Array(false)
    if(this.minecraft.currentScreen !== null) {
      let x = this.mouseX / this.minecraft.getMainCanvas().getGuiScaleFactor();
      let y = this.mouseY / this.minecraft.getMainCanvas().getGuiScaleFactor();
      
      if(flag) {
        GuiScreen.wrapScreenError(() => {
          aboolean[0] = this.minecraft.currentScreen!.mouseClicked(x, y, btn);
       }, 'mouseClicked event handler', this.minecraft.currentScreen.getClassName());
  
      } else {
        GuiScreen.wrapScreenError(() => {
          aboolean[0] = this.minecraft.currentScreen!.mouseReleased(x, y, btn);
        }, 'mouseReleased event handler', this.minecraft.currentScreen.getClassName());
      }
    }

    if (!aboolean[0] && (this.minecraft.currentScreen == null || this.minecraft.currentScreen.passEvents)) {
      if(btn == 0) this.leftDown = flag;
      else if (btn == 2) this.middleDown = flag;
      else if (btn == 1) this.rightDown = flag;
    }
  }

  private scrollCallback(xoffset: number, yoffset: number) {
    if(this.minecraft.currentScreen != null) {
      let d1 = this.mouseX / this.minecraft.getMainCanvas().getGuiScaleFactor();
      let d2 = this.mouseY / this.minecraft.getMainCanvas().getGuiScaleFactor();
      this.minecraft.currentScreen.mouseScrolled(d1, d2, yoffset);
   } 
  }

  private cursorPosCallback(xpos: number, ypos: number) {
    if (this.ignoreFirstMove) {
      this.mouseX = xpos;
      this.mouseY = ypos;
      this.ignoreFirstMove = false;
    }

    const iguieventlistener: IGuiEventListener = this.minecraft.currentScreen!;

    if(iguieventlistener !== null) {
      let x: number = xpos / 3
      let y: number = ypos / 3

      GuiScreen.wrapScreenError(() => {
        iguieventlistener.mouseMoved(x, y);
        /* @ts-ignore */
      }, "mouseMoved event handler", iguieventlistener.getClassName());

      if(this.activeButton !== -1) {  
        let x1: number = (xpos - this.mouseX) * this.minecraft.getMainCanvas().getGuiScaleFactor();
        let y1: number = (ypos - this.mouseY) * this.minecraft.getMainCanvas().getGuiScaleFactor();
        iguieventlistener.mouseDragged(x, y, this.activeButton, x1, y1);
      }
    }

    this.mouseX = xpos;
    this.mouseY = ypos;
  }

  public isLeftDown(): boolean {
    return this.leftDown
  }

  public isRightDown(): boolean {
    return this.rightDown
  }

  public getMouseX(): number {
    return this.mouseX
  }

  public getMouseY(): number {
    return this.mouseY
  }
}