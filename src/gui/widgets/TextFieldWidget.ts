import IGuiEventListener from "../../interfaces/IGuiEventListener";
import IRenderable from "../../interfaces/IRenderable";
import ColorHelper from "../../utils/ColorHelper";
import MathHelper from "../../utils/MathHelper";
import FontRenderer from "../FontRenderer";
import Widget from "./Widget";

export default class TextFieldWidget extends Widget implements IRenderable, IGuiEventListener {
  public text: string = '';
  private maxStringLength: number = 32;
  public cursorCounter: number = 0;
  private field_212956_h: boolean | any;
  private enableBackgroundDrawing = true;
  private canLoseFocus = true;
  private lineScrollOffset = 0;
  private cursorPosition = 0;
  private selectionEnd = 0;
  private enabledColor = 14737632;
  private disabledColor = 7368816;
  protected focused: boolean;

  constructor(x: number, y: number, w: number, h: number, p_i232259_6_: any, title: string) {
    super(x, y, w, h, title);
    this.focused = false;

    if (p_i232259_6_ instanceof TextFieldWidget) {
      this.setText(p_i232259_6_.getText());
      this.cursorCounter = p_i232259_6_.cursorCounter;
      this.focused = p_i232259_6_.focused;
      
    }
  }

  public setText(textIn: string): void {
    if(textIn.length > this.maxStringLength) {
       let i = textIn;

       this.text = i.substring(0, this.maxStringLength)
    }
    else this.text = textIn;
  }

  public getText(): string {
    return this.text;
  }

  public tick() {
    this.cursorCounter++;
  }

  private delete(modifiers: any, p_212950_1_: number): void {
    if (modifiers.controlKeyDown) {
       this.deleteWords(p_212950_1_);
    } else {
       this.deleteFromCursor(p_212950_1_);
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
              // stringArray.pop()
            }
          }

          let i = stringArray;
          i.pop();
          
          let k = true
          let l = i.length - 1          
          while(k) {
            if(i[l] !== '' && i[l] !== ' ') {
              break
            } else {
              i.pop()
            }

            l--
          }

          

          this.text = i.join('')
      }
    }
  }

  
  public getNthWordFromCursor(numWords: number) {
    return this.getNthWordFromPos(numWords, this.getCursorPosition());
 }
 public getCursorPosition(): number {
  return this.cursorPosition;
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
          let k = Math.max(1, this.cursorPosition);
          if (j != k) {
            let s = String(this.text).slice(0, this.text.length - 1).toString();
            this.text = s;
            
            this.setCursorPosition(j);
          }
       }
    }
  }


  public clampCursorPosition(pos: number) {
    this.cursorPosition = MathHelper.clamp(pos, 0, this.text.length);
  }

  public getAdjustedWidth(): number {
    return this.getEnableBackgroundDrawing() ? this.width - 8 : this.width;
  }

  private getEnableBackgroundDrawing(): boolean {
    return this.enableBackgroundDrawing;
    }

  public setEnableBackgroundDrawing(enableBackgroundDrawingIn: boolean): void {
    this.enableBackgroundDrawing = enableBackgroundDrawingIn;
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
    return this.visible && this.focused && this.active;
  }

  public keyDown(keyName: string, modifiers: any) {
    if (!this.canWrite()) {
      return false;
    } else {
      this.field_212956_h = modifiers.shiftKeyDown;
      if (false) {
          // this.setCursorPositionEnd();
          // this.setSelectionPos(0);
          return true;
      } else if (/* Screen.isCopy(keyCode) */false) {
          // Minecraft.getInstance().keyboardListener.setClipboardString(this.getSelectedText());
          return true;
      } else if (/* Screen.isPaste(keyCode) */false) {
          if (this.active) {
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
            if(this.active) { 
              this.field_212956_h = false;
              this.delete(modifiers, -1);
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
          case 'Control':
            break;
          case 'Alt':
            break;
          case 'Tab':
            break;
          case 'Enter':
            break;
          case 'Shift':
            break;
          case 'CapsLock':
            break;
          case 'NumLock':
            break;
          case 'ArrowLeft':
            this.moveCursorBy(-1);
            break;
          case 'ArrowRight':
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

      }
    }
  }

  public moveCursorBy(num: number) {
    this.setCursorPosition(this.func_238516_r_(num -10));
  }  

  private func_238516_r_(p_238516_1_: number) {
    return this.func_240980_a_(this.text, this.cursorPosition, p_238516_1_);
  }

  public func_240980_a_(p_240980_0_: string, p_240980_1_: number, p_240980_2_: number) {
    let i = p_240980_0_.length;
    if (p_240980_2_ >= 0) {
    /*    for(var j = 0; p_240980_1_ < i && j < p_240980_2_; ++j) {
          if (Character.isHighSurrogate(p_240980_0_.charAt(p_240980_1_++)) && p_240980_1_ < i && Character.isLowSurrogate(p_240980_0_.charAt(p_240980_1_))) {
             ++p_240980_1_;
          }
       } */
    } else {
       for(var k = p_240980_2_; p_240980_1_ > 0 && k < 0; ++k) {
          --p_240980_1_;
          // if (Character.isLowSurrogate(p_240980_0_.charAt(p_240980_1_)) && p_240980_1_ > 0 && Character.isHighSurrogate(p_240980_0_.charAt(p_240980_1_ - 1))) {
             --p_240980_1_;
          // }
       }
    }

    return p_240980_1_;
 }

  public renderButton(context: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
    let borderColor = this.focused ? -1 : -6250336;
    context.save();
    context.fillStyle = 'black';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.strokeStyle = ColorHelper.getColor(borderColor);
    context.strokeRect(this.x, this.y, this.width, this.height)
    context.restore();

    let textColor = this.active ? this.enabledColor : this.disabledColor;
    let j = this.cursorPosition - this.lineScrollOffset;
    let k = this.selectionEnd - this.lineScrollOffset;
    let flag = j >= 0 && j <= this.text.length;
    let flag1 = this.isFocused() /* && this.cursorCounter / 6 % 2 == 0 */ && flag;
    
    let s = this.text;
    let l = this.enableBackgroundDrawing ? this.x + 4 : this.x;
    let i1 = this.enableBackgroundDrawing ? this.y + (this.height - 8) / 2 : this.y;
    let j1: any = l;
    if (k > this.text.length) {
       k = this.text.length;
    }

/*     if (s !== '') {
      let s1 = flag ? s.substring(0, j) : s;
      j1 = FontRenderer.drawStringWithShadow(context, s1, l, i1, textColor, []);
   } */

   let flag2 = this.cursorPosition < this.text.length || this.text.length >= this.maxStringLength;
   let k1 = j1;
   if (!flag) {
      k1 = j > 0 ? l + this.width : l;
   } else if (flag2) {
      k1 = j1 - 1;
      --j1;
   }

    if(this.text !== '') {
      this.drawString(context, this.text, j1, i1, textColor);
    } else {
      if(!this.focused) {
        this.drawString(context, this.getMessage(), j1, i1, 10526880);
      }
    }

    if (s !== '' && flag && j < s.length) {
      FontRenderer.drawStringWithShadow(context, s.substring(j), j1, i1, textColor, []);
   }

    if (flag1) {
      if (flag2 && false) {
      /*   this.fill(context, k1, i1 - 1, k1 + 1, i1 + 1 + 9, -3092272); */
     } else {
      this.drawString(context, "_", (this.x + FontRenderer.getTextWidth(this.text)) + 4, i1, textColor);
     }
    }
  }

  public mouseClicked(mouseX: number, mouseY: number, button: number): boolean {
    if (!this.visible) {
      return false;
   } else {
      let flag = mouseX > this.x && mouseX < (this.x + this.width) && mouseY > this.y && mouseY < (this.y + this.height);

      if (this.canLoseFocus && flag) {
        this.focused = true;
      }

      if (this.isFocused() && flag) {
         let i = Math.floor(mouseX) - this.x;
         if (this.enableBackgroundDrawing) {
            i -= 4;
         }

         let s = this.text;
         this.setCursorPosition(this.text.length + this.lineScrollOffset);
         return true;
      } else {
        this.focused = false;
         return false;
      }
    }
  }

  public changeFocus(focus: boolean): boolean {
    if (this.active && this.visible) {
      this.focused = true;
      return this.focused;
    } else {
      return false;
    }
  }
}

// export default class TextFieldWidget extends Widget {
//   private text: string = '';
//   private maxStringLength: number = 32;
//   private cursorCounter: any;
//   private field_212956_h: boolean | any;
//   private enableBackgroundDrawing = true;
//   private canLoseFocus = true;
//   private isEnabled = true;
//   private lineScrollOffset = 0;
//   private cursorPosition = 0;
//   private selectionEnd = 0;
//   private enabledColor = 14737632;
//   private disabledColor = 7368816;
//   public focused: boolean = false;

//   constructor(x: number, y: number, w: number, h: number, p_i232259_6_: any, title: string) {
//     super(x, y, w, h, title);

//   /*   if (p_i232259_6_ !== null) {
//       this.setText(p_i232259_6_.getText());
//     } */
//   }

//   public setText(textIn: string): void {
//     if (textIn.length > this.maxStringLength) {
//       this.text = textIn.substring(0, this.maxStringLength);
//     } else {
//       this.text = textIn;
//     }
//   }

//   public getText(): string {
//     return this.text;
//   }

//   public getSelectedText(): string {
//     let i = this.cursorPosition < this.selectionEnd ? this.cursorPosition : this.selectionEnd;
//     let j = this.cursorPosition < this.selectionEnd ? this.selectionEnd : this.cursorPosition;
//     return this.text.substring(i, j);
//   }

//   public mouseClicked(mouseX: number, mouseY: number, button: number) {
//     if (!this.getVisible()) {
//        return false;
//     } else {
//        let flag = this.clicked(mouseX, mouseY);

//        if (this.canLoseFocus  && flag) {
//          this.focused = true;
//        }

//        if (this.isFocused() && flag) {
//           let i = Math.floor(mouseX) - this.x;
//           if (this.enableBackgroundDrawing) {
//              i -= 4;
//           }

//           let s = this.text;
//           this.setCursorPosition(this.text.length + this.lineScrollOffset);
//           return true;
//        } else {
//           return false;
//        }
//     }
//  }
 
//   public setFocused2(isFocusedIn: boolean): void {
//     this.setFocused(isFocusedIn);
//   }

//   public setFocused(idk: boolean): void {
//     this.focused = idk;
//   }

//   public keyPressed(keyName: string, modifiers: any) {
//     if (!this.canWrite()) {
//       return false;
//     } else {
//       this.field_212956_h = modifiers.shiftKeyDown;
//       if (false) {
//           // this.setCursorPositionEnd();
//           // this.setSelectionPos(0);
//           return true;
//       } else if (/* Screen.isCopy(keyCode) */false) {
//           // Minecraft.getInstance().keyboardListener.setClipboardString(this.getSelectedText());
//           return true;
//       } else if (/* Screen.isPaste(keyCode) */false) {
//           if (this.isEnabled) {
//             // this.writeText(Minecraft.getInstance().keyboardListener.getClipboardString());
//           }

//           return true;
//       } else if (/* Screen.isCut(keyCode) */false) {
//           // Minecraft.getInstance().keyboardListener.setClipboardString(this.getSelectedText());
//           // if (this.isEnabled) {
//             // this.writeText("");
//           // }

//           return true;
//       } else {

//         switch(keyName) {
//           case 'Backspace':
//             if (this.isEnabled) {
//               this.field_212956_h = false;
//               // this.delete(-1);
//             }
//             break;
//           case 'F1':
//             break;
//           case 'F2':
//             break;
//           case 'F3':
//             break;
//           case 'F4':
//             break;
//           case 'F5':
//             break;
//           case 'F6':
//             break;
//           case 'F7':
//             break;
//           case 'F8':
//             break;
//           case 'F9':
//             break;
//           case 'F10':
//             break;
//           case 'F11':
//             break;
//           case 'F12':
//             break;
//           default:
//             if((this.text + keyName).length <= this.maxStringLength) {
//               this.text += keyName;
//             }
//             break
//         } 
        
//      /*      switch(keyName) {
//           case 259:
//             if (this.isEnabled) {
//                 this.field_212956_h = false;
//                 this.delete(-1);
//                 this.field_212956_h = Screen.hasShiftDown();
//             }

//             return true;
//           case 260:
//           case 264:
//           case 265:
//           case 266:
//           case 267:
//           default:
//             return false;
//           case 261:
//             if (this.isEnabled) {
//                 this.field_212956_h = false;
//                 this.delete(1);
//                 this.field_212956_h = Screen.hasShiftDown();
//             }

//             return true;
//           case 262:
//             if (Screen.hasControlDown()) {
//                 this.setCursorPosition(this.getNthWordFromCursor(1));
//             } else {
//                 this.moveCursorBy(1);
//             }

//             return true;
//           case 263:
//             if (Screen.hasControlDown()) {
//                 this.setCursorPosition(this.getNthWordFromCursor(-1));
//             } else {
//                 this.moveCursorBy(-1);
//             }

//             return true;
//           case 268:
//             this.setCursorPositionZero();
//             return true;
//           case 269:
//             this.setCursorPositionEnd();
//             return true;
//           } */

//       }
//     }
//   }

// /*   private delete(p_212950_1_: number): void {
//     if (keyModifiers.keyCtrl) {
//        this.deleteWords(p_212950_1_);
//     } else {
//        this.deleteFromCursor(p_212950_1_);
//     }
//   }
//  */
//   public deleteWords(num: number): void {
//     if (this.text !== '') {
//        if (this.selectionEnd != this.cursorPosition) {
//           // this.writeText("");
//        } else {
//           // this.deleteFromCursor(this.getNthWordFromCursor(num) - this.cursorPosition);

//           var string: any = this.text;
//           string = string.split(" ");
//           var stringArray = new Array();
//           for(var j = 0; j < string.length; j++){
//             stringArray.push(string[j]);
            
//             if(j !== string.length - 1){
//               stringArray.push(" ");
//             }
//           }

//           let i = stringArray;
//           i.pop();
//           this.text = i.join('')
//       }
//     }
//   }

  
//   public getNthWordFromCursor(numWords: number) {
//     return this.getNthWordFromPos(numWords, this.getCursorPosition());
//  }

//  private getNthWordFromPos(n: number, pos: number) {
//     return this.getNthWordFromPosWS(n, pos, true);
//  }

//  private getNthWordFromPosWS(n: number, pos: number, skipWs: boolean) {
//     let i = pos;
//     let flag = n < 0;
//     let j = Math.abs(n);

//     for(let k = 0; k < j; ++k) {
//        if (!flag) {
//           let l = this.text.length;
//           i = this.text.split('').indexOf('32', i);
//           if (i == -1) {
//              i = l;
//           } else {
//              while(skipWs && i < l && this.text.charAt(i) == ' ') {
//                 ++i;
//              }
//           }
//        } else {
//           while(skipWs && i > 0 && this.text.charAt(i - 1) == ' ') {
//              --i;
//           }

//           while(i > 0 && this.text.charAt(i - 1) != ' ') {
//              --i;
//           }
//        }
//     }

//     return i;
//  }

//   public deleteFromCursor(num: number): void {
//     if (this.text !== '') {
//        if (this.selectionEnd != this.cursorPosition) {
//           // this.writeText("");
//        } else {
//           let i = this.func_238516_r_(num);
//           let j = Math.min(0, this.cursorPosition);
//           let k = Math.max(0, this.cursorPosition);
//           if (j != k) {
//             let s = String(this.text).slice(0, this.text.length - 1).toString();
//             this.text = s;
//             this.setCursorPosition(j);
//           }
//        }
//     }
//   }

//   private func_238516_r_(p_238516_1_: number) {
//     // return Util.func_240980_a_(this.text, this.cursorPosition, p_238516_1_);
//   }

//   public clampCursorPosition(pos: number) {
//     this.cursorPosition = MathHelper.clamp(pos, 0, this.text.length);
//   }

//   public setSelectionPos(position: number): void {
//     let i = this.text.length;
//     this.selectionEnd = MathHelper.clamp(position, 0, i);
//     if (this.lineScrollOffset > i) {
//       this.lineScrollOffset = i;
//     }


//     let j = this.getAdjustedWidth();
//     let s = this.text;
//     let k = s.length + this.lineScrollOffset;
//     if (this.selectionEnd == this.lineScrollOffset) {
//       this.lineScrollOffset -= this.text.length;
//     }

//     if (this.selectionEnd > k) {
//       this.lineScrollOffset += this.selectionEnd - k;
//     } else if (this.selectionEnd <= this.lineScrollOffset) {
//       this.lineScrollOffset -= this.lineScrollOffset - this.selectionEnd;
//     }

//     this.lineScrollOffset = MathHelper.clamp(this.lineScrollOffset, 0, i);

//  }

//   public setCursorPosition(pos: number): void {
//     this.clampCursorPosition(pos);
//     if (!this.field_212956_h) {
//        this.setSelectionPos(this.cursorPosition);
//     }
//   }

//   public setCursorPositionEnd(): void {
//     this.setCursorPosition(this.text.length);
//   }

//   public canWrite(): boolean {
//     return this.getVisible() && this.isFocused() && this.isEnabled;
//   }

//   public isFocused(): boolean {
//     return this.focused;
//   }

//   public renderObject(context: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
//     context.save();
//     context.imageSmoothingEnabled = true;
//     context.fillStyle = 'black';
//     context.fillRect(this.x, this.y, this.width, this.height);
//     let i = this.focused ? -1 : -6250336;
//     context.strokeStyle = ColorHelper.getColor(i);
//     context.strokeRect(this.x, this.y, this.width, this.height)
//     context.restore();

//     let i2 = this.isEnabled ? this.enabledColor : this.disabledColor;
//     let j = this.cursorPosition - this.lineScrollOffset;
//     let k = this.selectionEnd - this.lineScrollOffset;
//     // let s = 0; 
//     let flag = false;
//     let flag1 = true;
//     let l = this.enableBackgroundDrawing ? this.x + 4 : this.x;
//     let i1 = this.enableBackgroundDrawing ? this.y + (this.height - 8) / 2 : this.y;
//     let j1 = l;
// /*     if (k > s) {
//        k = s;
//     } */

//   /*   if( !== '') {
//       this.drawString(context, this.text, j1, i1, i2);
//     } else {
//       if(!this.focused) {
//         this.drawString(context, this.getMessage(), j1, i1, 10526880);
//       }
//     }

//     let flag2 = false;
//     let k1 = j1;
//     if (!flag) {
//       k1 = j > 0 ? l + this.width : l;
//     } else if (flag2) {
//       k1 = j1 - 1;
//       --j1;
//     }

//     if (this.focused) {
//       if (flag2) {
//           // AbstractGui.fill(matrixStack, k1, i1 - 1, k1 + 1, i1 + 1 + 9, -3092272);
//       } else {
//         this.drawString(context, "_", (this.x + FontRenderer.getTextWidth(this.text)) + 4, i1, i2);
//       }
//     }
//  */
//   }

//   private drawSelectionBox(): void {

//   }

//   public setMaxStringLength(length: number): void {
//     this.maxStringLength = length;
//     if (this.text.length > length) this.text = this.text.substring(0, length);
//   }

//   private getMaxStringLength(): number {
//     return this.maxStringLength;
//  }

//   public getCursorPosition(): number {
//     return this.cursorPosition;
//   }

//   private getEnableBackgroundDrawing(): boolean {
//   return this.enableBackgroundDrawing;
//   }

//   public setEnableBackgroundDrawing(enableBackgroundDrawingIn: boolean): void {
//     this.enableBackgroundDrawing = enableBackgroundDrawingIn;
//   }

//   public setTextColor(color: number): void {
//     this.enabledColor = color;
//   }

//   public setDisabledTextColour(color: number): void {
//     this.disabledColor = color;
//   }

//   private getEnabled(): boolean {
//     return this.isEnabled;
//   }

//   public setEnabled(enabled: boolean): void {
//     this.isEnabled = enabled;
//   }

//   public getAdjustedWidth(): number {
//     return this.getEnableBackgroundDrawing() ? this.width - 8 : this.width;
//   }

//   public getVisible(): boolean {
//     return this.visible;
//   }

//   public setVisible(isVisible: boolean): void {
//     this.visible = isVisible;
//   }
// }