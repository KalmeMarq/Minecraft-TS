import { addCharacterRenderer, characterRenderers, fontImg, getFontChars } from "../utils/GetResources";
import ColorHelper from "../utils/ColorHelper";

// let getFontChars: any = getFontgetFontChars;

export class CharacterRenderer {
  private r;
  private g;
  private b;
  private char;
  private charWidth;
  private charHeight;

  constructor(char: string, color: number) {
    this.char =  char;
    this.charWidth =  getFontChars[this.char].w;
    this.charHeight =  getFontChars[this.char].h;
    this.r = ColorHelper.getRed(color);
    this.g = ColorHelper.getGreen(color);
    this.b = ColorHelper.getBlue(color);
  }

  public create(): HTMLCanvasElement {
    const ctxfont = document.createElement('canvas')!.getContext('2d')!;
    ctxfont.canvas.width = this.charWidth;
    ctxfont.canvas.height = this.charHeight;
    ctxfont.drawImage(fontImg, getFontChars[this.char].x, getFontChars[this.char].y, this.charWidth, this.charHeight, 0, 0, this.charWidth, this.charHeight);
        
    ctxfont.save();
    let myImg = ctxfont.getImageData(0, 0, this.charWidth * 3, this.charHeight * 3);
    ctxfont.clearRect(0, 0, this.charWidth, this.charHeight);
    for(var p = 0; p < myImg.data.length; p+=4) myImg.data[p] = this.r, myImg.data[p + 1] = this.g, myImg.data[p + 2] = this.b;
    ctxfont.restore();

    ctxfont.putImageData(myImg, 0, 0);
    return ctxfont.canvas;
  }

  public createShadow(): HTMLCanvasElement {
    const ctxfont = document.createElement('canvas')!.getContext('2d')!;
    ctxfont.canvas.width = this.charWidth;
    ctxfont.canvas.height = this.charHeight;
    ctxfont.drawImage(fontImg, getFontChars[this.char].x, getFontChars[this.char].y, this.charWidth, this.charHeight, 0, 0, this.charWidth, this.charHeight);

    ctxfont.save();
    let myImg = ctxfont.getImageData(0, 0, this.charWidth * 3, this.charHeight * 3);
    ctxfont.clearRect(0, 0, this.charWidth, this.charHeight);
    for(var p = 0; p < myImg.data.length; p += 4) myImg.data[p] = this.r * 0.18, myImg.data[p + 1] = this.g * 0.18, myImg.data[p + 2] = this.b * 0.18;
    ctxfont.restore();

    ctxfont.putImageData(myImg, 0, 0);
    return ctxfont.canvas;
  }
} 

export default class FontRenderer {
  public static getTextWidth(text: string) {
    let width = 0;
    text.split('').forEach((char, idx) => width += getFontChars[text[idx]].w - 1)
    return width;
  }

  public static drawStringWithShadow(context: CanvasRenderingContext2D, text: string, posX: number, posY: number, color: number, _formatting: []) {
    for(var j = 0, k = posX; j < text.length; j++) {
      const char: any = text[j];
      if(!(characterRenderers[color] && characterRenderers[color][char])) addCharacterRenderer(color, char);
      
      context.drawImage(characterRenderers[color][char]['textShadow'], k - 1 + 1, posY + 1);
      context.drawImage(characterRenderers[color][char]['text'], k - 1, posY);

      k += getFontChars[char].w - 1;
    }
  }

  public static filll(context: CanvasRenderingContext2D, minX: number, minY: number, maxX: number, maxY: number, color: number) {
    context.save();
    context.fillStyle = ColorHelper.getColor(color);
    context.fillRect(minX, minY, maxX, maxY);
    context.stroke();
  }
}