import { addCharacterRenderer, characterRenderers, fontImg, getFontChars } from "../index.js";
import ColorHelper from "../utils/ColorHelper.js";

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

  create() {
    const fontcanvas = document.createElement('canvas')!;
    const ctxfont = fontcanvas.getContext('2d')!;

    fontcanvas.width = this.charWidth;
    fontcanvas.height = this.charHeight;
    
    ctxfont.save();
    ctxfont.imageSmoothingEnabled = false;
    ctxfont.drawImage(fontImg, getFontChars[this.char].x, getFontChars[this.char].y, this.charWidth, this.charHeight, 0, 0, this.charWidth, this.charHeight);
    ctxfont.restore();

    ctxfont.scale(3, 3);
    var myImg = ctxfont.getImageData(0, 0, this.charWidth * 3, this.charHeight * 3);
    ctxfont.clearRect(0, 0, this.charWidth, this.charHeight);
     for (var t=0;t< myImg.data.length;t+=4) {        
        myImg.data[t] = this.r;
        myImg.data[t+1]= this.g;
        myImg.data[t+2]= this.b;
     }
     ctxfont.putImageData(myImg, 0, 0);
   
    ctxfont.restore();
    return fontcanvas;
  }

  createShadow() {
    const fontcanvas = document.createElement('canvas')!;
    const ctxfont = fontcanvas.getContext('2d')!;

    fontcanvas.width = this.charWidth;
    fontcanvas.height = this.charHeight;
    
    ctxfont.save();
    ctxfont.imageSmoothingEnabled = false;
    ctxfont.drawImage(fontImg, getFontChars[this.char].x, getFontChars[this.char].y, this.charWidth, this.charHeight, 0, 0, this.charWidth, this.charHeight);
    
    ctxfont.scale(3, 3);
     var myImg = ctxfont.getImageData(0, 0, this.charWidth * 3, this.charHeight * 3);
     ctxfont.clearRect(0, 0, this.charWidth, this.charHeight);
      for (var t=0;t< myImg.data.length;t+=4) {        
         myImg.data[t] = this.r - (42.5 * 5.4);
         myImg.data[t+1]= this.g - (42.5 * 5.4);
         myImg.data[t+2]= this.b - (42.5 * 5.4);
      }
      ctxfont.putImageData(myImg, 0, 0); // Image data is adjusted according to context 
    
    ctxfont.restore();
    return fontcanvas;
  }
} 



export default class FontRenderer {
  public static getTextWidth(text: string) {
    let width = 0;
    for (let j = 0; j < text.length; j++) {
      width += getFontChars[text[j]].w - 1;
    }

    return width;
  }

  public static renderCenteredText(text: string, posX: number, posY: number, color: number) {
    let textgetFontChars = text.split('');
    let textwidth = FontRenderer.getTextWidth(text);

    for(var j = 0, k = posX; j < textgetFontChars.length; j++) {
     
      
      const char: any = textgetFontChars[j];
      if(!(characterRenderers[color] && characterRenderers[color][textgetFontChars[j]])) {
        addCharacterRenderer(color, textgetFontChars[j]);
      }

      (<HTMLCanvasElement>document.getElementById('root')).getContext('2d')!.drawImage(characterRenderers[color][char]['textShadow'], k - 1 - textwidth / 2 + 1, posY + 1);
      (<HTMLCanvasElement>document.getElementById('root')).getContext('2d')!.drawImage(characterRenderers[color][char]['text'], k - 1 - textwidth / 2, posY);
    
      k += getFontChars[char].w - 1;
    }
  }

  public static renderText(context: CanvasRenderingContext2D, text: string, posX: number, posY: number, color: number) {

    let textgetFontChars = text.split('');
    let textwidth = FontRenderer.getTextWidth(text);

    for(var j = 0, k = posX; j < textgetFontChars.length; j++) {
      const char: any = textgetFontChars[j];
      if(!(characterRenderers[color] && characterRenderers[color][textgetFontChars[j]])) {
        addCharacterRenderer(color, textgetFontChars[j]);
      }
      
      context.drawImage(characterRenderers[color][char]['textShadow'], k - 1 + 1, posY + 1);
      context.drawImage(characterRenderers[color][char]['text'], k - 1, posY);
    
      k += getFontChars[char].w - 1;
    }
  }

  public static drawStringWithShadow(context: CanvasRenderingContext2D, text: string, posX: number, posY: number, color: number) {
    let textgetFontChars = text.split('');
    let textwidth = FontRenderer.getTextWidth(text);

    for(var j = 0, k = posX; j < textgetFontChars.length; j++) {
      const char: any = textgetFontChars[j];
      if(!(characterRenderers[color] && characterRenderers[color][textgetFontChars[j]])) {
        addCharacterRenderer(color, textgetFontChars[j]);
      }
      
      context.drawImage(characterRenderers[color][char]['textShadow'], k - 1 + 1, posY + 1);
      context.drawImage(characterRenderers[color][char]['text'], k - 1, posY);
    
      k += getFontChars[char].w - 1;
    }
  }
}