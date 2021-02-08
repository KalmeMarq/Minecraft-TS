import { getResourceLocation } from "../utils/Resources.js";
import ColorHelper from "../utils/ColorHelper.js";
import Minecraft from "../Minecraft.js";

export let characterRenderers: any = {};
export let addCharacterRenderer = (color: number, char: string) => {
  if(!characterRenderers[color]) {
    characterRenderers[color] = {}
  }
  characterRenderers[color][char] = {
    text: new CharacterRenderer(char, color).create(),
    textShadow: new CharacterRenderer(char, color).createShadow()
  };
}

export class CharacterRenderer {
  private r;
  private g;
  private b;
  private char;
  private charWidth;
  private charHeight;

  constructor(char: string, color: number) {
    this.char =  char;
    this.charWidth =  getResourceLocation('fonts', 'font')[this.char].w;
    this.charHeight =  getResourceLocation('fonts', 'font')[this.char].h;
    this.r = ColorHelper.getRed(color);
    this.g = ColorHelper.getGreen(color);
    this.b = ColorHelper.getBlue(color);
  }

  public create(): HTMLCanvasElement {
    const ctxfont = document.createElement('canvas')!.getContext('2d')!;
    ctxfont.canvas.width = this.charWidth;
    ctxfont.canvas.height = this.charHeight;
    ctxfont.drawImage(getResourceLocation('textures', 'font/ascii'), getResourceLocation('fonts', 'font')[this.char].x, getResourceLocation('fonts', 'font')[this.char].y, this.charWidth, this.charHeight, 0, 0, this.charWidth, this.charHeight);
        
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
    ctxfont.drawImage(getResourceLocation('textures', 'font/ascii'), getResourceLocation('fonts', 'font')[this.char].x, getResourceLocation('fonts', 'font')[this.char].y, this.charWidth, this.charHeight, 0, 0, this.charWidth, this.charHeight);

    ctxfont.save();
    let myImg = ctxfont.getImageData(0, 0, this.charWidth * 3, this.charHeight * 3);
    ctxfont.clearRect(0, 0, this.charWidth, this.charHeight);
    for(var p = 0; p < myImg.data.length; p += 4) myImg.data[p] = this.r * 0.13, myImg.data[p + 1] = this.g * 0.13, myImg.data[p + 2] = this.b * 0.13;
    ctxfont.restore();

    ctxfont.putImageData(myImg, 0, 0);
    return ctxfont.canvas;
  }
} 

export default class FontRenderer {
  public static getTextWidth(text: string) {
    const flag = localStorage.getItem('Options') ? 'true'.equals(localStorage.getItem('Options')!.split('\n').filter(x => x.includes('forceUnicodeFont:'))[0].split(':')[1]) : false;
    if(flag) {
      return (<HTMLCanvasElement>document.getElementById('root')).getContext('2d')!.measureText(text).width;
    } else {
      let width = 0;
      text.split('').forEach((char, idx) => width += getResourceLocation('fonts', 'font')[text[idx]].w - 1)
      return width;
    }
  }

  public static drawStringWithShadow(context: CanvasRenderingContext2D, text: string, posX: number, posY: number, color: number, _formatting: []) {
    const flag = localStorage.getItem('Options') ? 'true'.equals(localStorage.getItem('Options')!.split('\n').filter(x => x.includes('forceUnicodeFont:'))[0].split(':')[1]) : false;
    if(flag) {
      context.save();
      context.font = 'lighter 10px Arial';
      context.fillStyle = ColorHelper.getDarkerColor(color);
      context.fillText(text, posX + 1, posY + 14 / 2 + 1);
      context.fillStyle = ColorHelper.getColor(color);
      context.fillText(text, posX, posY + 14 / 2);
      context.restore();
    } else {
      for(var j = 0, k = posX; j < text.length; j++) {
        const char: any = text[j];
        if(!(characterRenderers[color] && characterRenderers[color][char])) addCharacterRenderer(color, char);
        
        context.drawImage(characterRenderers[color][char]['textShadow'], k - 1 + 1, posY + 1);
        context.drawImage(characterRenderers[color][char]['text'], k - 1, posY);
  
        k += getResourceLocation('fonts', 'font')[char].w - 1;
      }
    }
  }

  public static filll(context: CanvasRenderingContext2D, minX: number, minY: number, maxX: number, maxY: number, color: number) {
    context.save();
    context.fillStyle = ColorHelper.getColor(color);
    context.fillRect(minX, minY, maxX, maxY);
    context.stroke();
  }
}