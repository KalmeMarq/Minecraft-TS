import { clickXM, clickYM, ctx, keyModifiers, keyName, resetClickXY, resetKeyInfo, scaleFactor } from "../../../index.js";
import ColorHelper from "../../../util/ColorHelper.js";
import MathHelper from "../../../util/MathHelper.js";
import FontRenderer from "../FontRenderer.js";
import Widget from "./Widget.js";

export default class TextFieldWidget extends Widget {
  private text: string = '';
  private maxStringLength: number = 32;
  private cursorCounter: any;
  private field_212956_h: boolean | any;
  private enableBackgroundDrawing = true;
  private canLoseFocus = true;
  private isEnabled = true;
  private lineScrollOffset = 0;
  private cursorPosition = 0;
  private selectionEnd = 0;
  private enabledColor = 14737632;
  private disabledColor = 7368816;
  fontRenderer: any;
  public focused: boolean = false;

  constructor(x: number, y: number, w: number, h: number, p_i232259_6_: any, title: string) {
    super(x, y, w, h, title);

    if (p_i232259_6_ != null) {
      this.setText(p_i232259_6_.getText());
    }
  }

  public setText(textIn: string): void {
    if (textIn.length > this.maxStringLength) {
      this.text = textIn.substring(0, this.maxStringLength);
    } else {
      this.text = textIn;
    }
  }

  public getText(): string {
    return this.text;
  }

  public getSelectedText(): string {
    let i = this.cursorPosition < this.selectionEnd ? this.cursorPosition : this.selectionEnd;
    let j = this.cursorPosition < this.selectionEnd ? this.selectionEnd : this.cursorPosition;
    return this.text.substring(i, j);
  }

  public mouseClicked(clickX: number, clickY: number) {
    if (!this.getVisible()) {
       return false;
    } else {
       let flag = clickX >= this.x * scaleFactor && clickX < (this.x + this.width) * scaleFactor && clickY >= this.y * scaleFactor && clickY < (this.y + this.height) * scaleFactor;

       if (this.canLoseFocus  && flag) {
         this.focused = true;
       }

       if (this.isFocused() && flag) {
          let i = Math.floor(clickX) - this.x;
          if (this.enableBackgroundDrawing) {
             i -= 4;
          }

          let s = this.text;
          this.setCursorPosition(this.text.length + this.lineScrollOffset);
          return true;
       } else {
          return false;
       }
    }
 }
 
  public setFocused2(isFocusedIn: boolean): void {
    this.setFocused(isFocusedIn);
  }

  public setFocused(idk: boolean): void {
    this.focused = idk;
  }

  public keyPressed() {
    if (!this.canWrite()) {
      return false;
    } else {
      this.field_212956_h = keyModifiers.keyShift;
      if (false) {
          // this.setCursorPositionEnd();
          // this.setSelectionPos(0);
          return true;
      } else if (/* Screen.isCopy(keyCode) */false) {
          // Minecraft.getInstance().keyboardListener.setClipboardString(this.getSelectedText());
          return true;
      } else if (/* Screen.isPaste(keyCode) */false) {
          if (this.isEnabled) {
            // this.writeText(Minecraft.getInstance().keyboardListener.getClipboardString());
          }

          return true;
      } else if (/* Screen.isCut(keyCode) */false) {
          // Minecraft.getInstance().keyboardListener.setClipboardString(this.getSelectedText());
          // if (this.isEnabled) {
            // this.writeText("");
          // }

          return true;
      } else {

        switch(keyName) {
          case 'Backspace':
            if (this.isEnabled) {
              this.field_212956_h = false;
              this.delete(-1);
            }
            break;
          case 'F1':
            break;
          case 'F2':
            break;
          case 'F3':
            break;
          case 'F4':
            break;
          case 'F5':
            break;
          case 'F6':
            break;
          case 'F7':
            break;
          case 'F8':
            break;
          case 'F9':
            break;
          case 'F10':
            break;
          case 'F11':
            break;
          case 'F12':
            break;
          default:
            if((this.text + keyName).length <= this.maxStringLength) {
              this.text += keyName;
            }
            break
        } 
        
     /*      switch(keyName) {
          case 259:
            if (this.isEnabled) {
                this.field_212956_h = false;
                this.delete(-1);
                this.field_212956_h = Screen.hasShiftDown();
            }

            return true;
          case 260:
          case 264:
          case 265:
          case 266:
          case 267:
          default:
            return false;
          case 261:
            if (this.isEnabled) {
                this.field_212956_h = false;
                this.delete(1);
                this.field_212956_h = Screen.hasShiftDown();
            }

            return true;
          case 262:
            if (Screen.hasControlDown()) {
                this.setCursorPosition(this.getNthWordFromCursor(1));
            } else {
                this.moveCursorBy(1);
            }

            return true;
          case 263:
            if (Screen.hasControlDown()) {
                this.setCursorPosition(this.getNthWordFromCursor(-1));
            } else {
                this.moveCursorBy(-1);
            }

            return true;
          case 268:
            this.setCursorPositionZero();
            return true;
          case 269:
            this.setCursorPositionEnd();
            return true;
          } */

        resetKeyInfo();
      }
    }
  }

  private delete(p_212950_1_: number): void {
    if (keyModifiers.keyCtrl) {
       this.deleteWords(p_212950_1_);
       resetKeyInfo();
    } else {
       this.deleteFromCursor(p_212950_1_);
       resetKeyInfo();
    }
  }

  public deleteWords(num: number): void {
    if (this.text !== '') {
       if (this.selectionEnd != this.cursorPosition) {
          // this.writeText("");
       } else {
          // this.deleteFromCursor(this.getNthWordFromCursor(num) - this.cursorPosition);

          var string: any = this.text;
          string = string.split(" ");
          var stringArray = new Array();
          for(var j = 0; j < string.length; j++){
            stringArray.push(string[j]);
            
            if(j !== string.length - 1){
              stringArray.push(" ");
            }
          }

          let i = stringArray;
          i.pop();
          this.text = i.join('')
      }
    }
  }

  
  public getNthWordFromCursor(numWords: number) {
    return this.getNthWordFromPos(numWords, this.getCursorPosition());
 }

 private getNthWordFromPos(n: number, pos: number) {
    return this.getNthWordFromPosWS(n, pos, true);
 }

 private getNthWordFromPosWS(n: number, pos: number, skipWs: boolean) {
    let i = pos;
    let flag = n < 0;
    let j = Math.abs(n);

    for(let k = 0; k < j; ++k) {
       if (!flag) {
          let l = this.text.length;
          i = this.text.split('').indexOf('32', i);
          if (i == -1) {
             i = l;
          } else {
             while(skipWs && i < l && this.text.charAt(i) == ' ') {
                ++i;
             }
          }
       } else {
          while(skipWs && i > 0 && this.text.charAt(i - 1) == ' ') {
             --i;
          }

          while(i > 0 && this.text.charAt(i - 1) != ' ') {
             --i;
          }
       }
    }

    return i;
 }

  public deleteFromCursor(num: number): void {
    if (this.text !== '') {
       if (this.selectionEnd != this.cursorPosition) {
          // this.writeText("");
       } else {
          let i = this.func_238516_r_(num);
          let j = Math.min(0, this.cursorPosition);
          let k = Math.max(0, this.cursorPosition);
          if (j != k) {
            let s = String(this.text).slice(0, this.text.length - 1).toString();
            this.text = s;
            this.setCursorPosition(j);
          }
       }
    }
  }

  private func_238516_r_(p_238516_1_: number) {
    // return Util.func_240980_a_(this.text, this.cursorPosition, p_238516_1_);
  }

  public clampCursorPosition(pos: number) {
    this.cursorPosition = MathHelper.clamp(pos, 0, this.text.length);
  }

  public setSelectionPos(position: number): void {
    let i = this.text.length;
    this.selectionEnd = MathHelper.clamp(position, 0, i);
    if (this.lineScrollOffset > i) {
      this.lineScrollOffset = i;
    }


    let j = this.getAdjustedWidth();
    let s = this.text;
    let k = s.length + this.lineScrollOffset;
    if (this.selectionEnd == this.lineScrollOffset) {
      this.lineScrollOffset -= this.text.length;
    }

    if (this.selectionEnd > k) {
      this.lineScrollOffset += this.selectionEnd - k;
    } else if (this.selectionEnd <= this.lineScrollOffset) {
      this.lineScrollOffset -= this.lineScrollOffset - this.selectionEnd;
    }

    this.lineScrollOffset = MathHelper.clamp(this.lineScrollOffset, 0, i);

 }

  public setCursorPosition(pos: number): void {
    this.clampCursorPosition(pos);
    if (!this.field_212956_h) {
       this.setSelectionPos(this.cursorPosition);
    }
  }

  public setCursorPositionEnd(): void {
    this.setCursorPosition(this.text.length);
  }

  public canWrite(): boolean {
    return this.getVisible() && this.isFocused() && this.isEnabled;
  }

  public isFocused(): boolean {
    return this.focused;
  }

  public renderButton(mouseX: number, mouseY: number) {
    this.drawSelectionBox();
    this.mouseClicked(clickXM, clickYM);
    this.keyPressed();

    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    let i = this.focused ? -1 : -6250336;
    ctx.strokeStyle = ColorHelper.getColor(i);
    ctx.strokeRect(this.x, this.y, this.width, this.height)
    ctx.restore();

    let i2 = this.isEnabled ? this.enabledColor : this.disabledColor;
    let j = this.cursorPosition - this.lineScrollOffset;
    let k = this.selectionEnd - this.lineScrollOffset;
    let s = this.text; 
    let flag = false;
    let flag1 = true;
    let l = this.enableBackgroundDrawing ? this.x + 4 : this.x;
    let i1 = this.enableBackgroundDrawing ? this.y + (this.height - 8) / 2 : this.y;
    let j1 = l;
    if (k > s.length) {
       k = s.length;
    }

    if(this.text !== '') {
      FontRenderer.renderText(this.text, j1, i1, i2);
    } else {
      if(!this.focused) {
        FontRenderer.renderText(this.message, j1, i1, 10526880);
      }
    }

    let flag2 = false;
    let k1 = j1;
    if (!flag) {
      k1 = j > 0 ? l + this.width : l;
    } else if (flag2) {
      k1 = j1 - 1;
      --j1;
    }

    if (this.focused) {
      if (flag2) {
          // AbstractGui.fill(matrixStack, k1, i1 - 1, k1 + 1, i1 + 1 + 9, -3092272);
      } else {
        FontRenderer.renderText("_", (this.x + FontRenderer.getTextWidth(this.text.split(''))) + 4, i1, i2);
      }
    }

  }

  private drawSelectionBox(): void {

  }

  public setMaxStringLength(length: number): void {
    this.maxStringLength = length;
    if (this.text.length > length) this.text = this.text.substring(0, length);
  }

  private getMaxStringLength(): number {
    return this.maxStringLength;
 }

  public getCursorPosition(): number {
    return this.cursorPosition;
  }

  private getEnableBackgroundDrawing(): boolean {
  return this.enableBackgroundDrawing;
  }

  public setEnableBackgroundDrawing(enableBackgroundDrawingIn: boolean): void {
    this.enableBackgroundDrawing = enableBackgroundDrawingIn;
  }

  public setTextColor(color: number): void {
    this.enabledColor = color;
  }

  public setDisabledTextColour(color: number): void {
    this.disabledColor = color;
  }

  private getEnabled(): boolean {
    return this.isEnabled;
  }

  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  public getAdjustedWidth(): number {
    return this.getEnableBackgroundDrawing() ? this.width - 8 : this.width;
  }

  public getVisible(): boolean {
    return this.visible;
  }

  public setVisible(isVisible: boolean): void {
    this.visible = isVisible;
  }
}